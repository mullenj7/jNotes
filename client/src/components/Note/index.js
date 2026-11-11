import isHotkey from 'is-hotkey'
import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { Editor, Node, Transforms, createEditor, select } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, useSlate, withReact } from 'slate-react'
import { NoteButton, Icon, Toolbar } from '../NoteUtils'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicSharpIcon from '@mui/icons-material/FormatItalicSharp';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { TextField, Box, Button } from '@mui/material'


const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}
const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']
const Note = ({ handleSave, selectedNote, setSelectedNote }) => {

    const initialValue = [{ "type": "paragraph", "children": [{ "text": "" }] }]
    const renderElement = useCallback(props => <Element {...props} />, [])
    const [title, setTitle] = useState(selectedNote && selectedNote.title ? selectedNote.title : 'Title')
    const [enableSave, setEnableSave] = useState(false)
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const [noteContent, setNoteContent] = useState(initialValue)
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    useEffect(() => {
        if (selectedNote && selectedNote.content) {
            const content = JSON.parse(selectedNote.content)
            setNoteContent(content)
            editor.children = content
            setTitle(selectedNote.title)
            editor.onChange()
        }
    }, [selectedNote])

    const toggleBlock = (editor, format) => {
        if (!enableSave) {
            setEnableSave(true)
        }
        const isActive = isBlockActive(
            editor,
            format,
            isAlignType(format) ? 'align' : 'type'
        )
        const isList = isListType(format)
        Transforms.unwrapNodes(editor, {
            match: n => Node.isElement(n) && isListType(n.type) && !isAlignType(format),
            split: true,
        })
        let newProperties
        if (isAlignType(format)) {
            newProperties = {
                align: isActive ? undefined : format,
            }
        } else {
            newProperties = {
                type: isActive ? 'paragraph' : isList ? 'list-item' : format,
            }
        }
        Transforms.setNodes(editor, newProperties)
        if (!isActive && isList) {
            const block = { type: format, children: [] }
            Transforms.wrapNodes(editor, block)
        }
    }
    const toggleMark = (editor, format) => {
        if (!enableSave) {
            setEnableSave(true)
        }
        const isActive = isMarkActive(editor, format)
        if (isActive) {
            Editor.removeMark(editor, format)
        } else {
            Editor.addMark(editor, format, true)
        }
    }
    const isBlockActive = (editor, format, blockType = 'type') => {
        const { selection } = editor
        if (!selection) return false
        const [match] = Array.from(
            Editor.nodes(editor, {
                at: Editor.unhangRange(editor, selection),
                match: n => {
                    if (Node.isElement(n)) {
                        if (blockType === 'align' && isAlignElement(n)) {
                            return n.align === format
                        }
                        return n.type === format
                    }
                    return false
                },
            })
        )
        return !!match
    }
    const isMarkActive = (editor, format) => {
        const marks = Editor.marks(editor)
        return marks ? marks[format] === true : false
    }
    const Element = ({ attributes, children, element }) => {
        const style = {}
        if (isAlignElement(element)) {
            style.textAlign = element.align
        }
        switch (element.type) {
            case 'block-quote':
                return (
                    <blockquote style={style} {...attributes}>
                        {children}
                    </blockquote>
                )
            case 'bulleted-list':
                return (
                    <ul style={style} {...attributes}>
                        {children}
                    </ul>
                )
            case 'list-item':
                return (
                    <li style={style} {...attributes}>
                        {children}
                    </li>
                )
            case 'numbered-list':
                return (
                    <ol style={style} {...attributes}>
                        {children}
                    </ol>
                )
            default:
                return (
                    <p style={style} {...attributes}>
                        {children}
                    </p>
                )
        }
    }
    const Leaf = ({ attributes, children, leaf }) => {
        if (leaf.bold) {
            children = <strong>{children}</strong>
        }
        if (leaf.code) {
            children = <code>{children}</code>
        }
        if (leaf.italic) {
            children = <em>{children}</em>
        }
        if (leaf.underline) {
            children = <u>{children}</u>
        }
        return <span {...attributes}>{children}</span>
    }
    const BlockButton = ({ format, icon }) => {
        const editor = useSlate()
        return (
            <NoteButton
                active={isBlockActive(
                    editor,
                    format,
                    isAlignType(format) ? 'align' : 'type'
                )}
                onPointerDown={event => event.preventDefault()}
                onClick={() => toggleBlock(editor, format)}
                data-test-id={`block-button-${format}`}
            >
                {icon}
            </NoteButton>
        )
    }
    const MarkButton = ({ format, icon }) => {
        const editor = useSlate()
        return (
            <NoteButton
                active={isMarkActive(editor, format)}
                onPointerDown={event => event.preventDefault()}
                onClick={() => toggleMark(editor, format)}
            >
                {icon}
            </NoteButton>
        )
    }
    const isAlignType = format => {
        return TEXT_ALIGN_TYPES.includes(format)
    }
    const isListType = format => {
        return LIST_TYPES.includes(format)
    }
    const isAlignElement = element => {
        return 'align' in element
    }


    return (
        <>
            <Box sx={{ overflow: 'auto' }}>
                <TextField placeholder='Title' value={title} onChange={(event) => { setTitle(event.target.value); }}></TextField>
                <Slate editor={editor} initialValue={noteContent}>
                    <Toolbar>
                        <MarkButton format="bold" icon={<FormatBoldIcon />} />
                        <MarkButton format="italic" icon={<FormatItalicSharpIcon />} />
                        <MarkButton format="underline" icon={<FormatUnderlinedIcon />} />
                        <MarkButton format="code" icon={<CodeIcon />} />
                        {/* <BlockButton format="heading-one" icon={<FormatBoldIcon />} />
    <BlockButton format="heading-two" icon={<FormatBoldIcon />} /> */}
                        <BlockButton format="block-quote" icon={<FormatQuoteIcon />} />
                        <BlockButton format="numbered-list" icon={<FormatListNumberedIcon />} />
                        <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon />} />
                        <BlockButton format="left" icon={<FormatAlignLeftIcon />} />
                        <BlockButton format="center" icon={<FormatAlignCenterIcon />} />
                        <BlockButton format="right" icon={<FormatAlignRightIcon />} />
                        <BlockButton format="justify" icon={<FormatAlignJustifyIcon />} />
                    </Toolbar>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Enter some rich text…"
                        spellCheck
                        autoFocus
                        onKeyDown={event => {
                            if (!enableSave) {
                                setEnableSave(true)
                            }
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(editor, mark)
                                }
                            }
                        }} />
                </Slate>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexGrow: 1 }}>
                <Button variant='contained' disabled={!enableSave} onClick={() => { handleSave(editor) }}>save</Button>
            </Box>
        </>
    )
}



// const initialValue = [
//     {
//         type: 'paragraph',
//         children: [
//             { text: 'This is editable ' },
//             { text: 'rich', bold: true },
//             { text: ' text, ' },
//             { text: 'much', italic: true },
//             { text: ' better than a ' },
//             { text: '<textarea>', code: true },
//             { text: '!' },
//         ],
//     },
//     {
//         type: 'paragraph',
//         children: [
//             {
//                 text: "Since it's rich text, you can do things like turn a selection of text ",
//             },
//             { text: 'bold', bold: true },
//             {
//                 text: ', or add a semantically rendered block quote in the middle of the page, like this:',
//             },
//         ],
//     },
//     {
//         type: 'block-quote',
//         children: [{ text: 'A wise quote.' }],
//     },
//     {
//         type: 'paragraph',
//         align: 'center',
//         children: [{ text: 'Try it out for yourself!' }],
//     },
// ]
export default Note