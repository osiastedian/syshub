import React, {useState} from "react";
import DOMPurify from "dompurify";

import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {yupResolver} from "@hookform/resolvers";
import * as yup from "yup";

//import for text editor
import {EditorState, convertToRaw} from "draft-js";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from 'html-to-draftjs';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const schema = yup.object().shape({
    proposalUrl: yup.string().url("Must be a valid url").required("URL is required"),
    proposalDescription: yup.string().max(1000, 'Description must be at most 1000 characters')
});


export function escape(unescaped) {
    return unescaped
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export function unescape(escaped) {
    return escaped
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

/**
 * Component to show the Proposal description form
 * @component
 * @subcategory Proposal
 * @param {*} onNext function that gets executed after the form is submitted
 * @param {*} onBack function that gets executed to go back
 * @example
 * const onNext = () => {}
 * const onBack = () => {}
 * return (
 *  <DescriptionProposal onNext={onNext} onBack={onBack} />
 * )
 */
function DescriptionProposal({onNext, onBack}) {
    const [showEditor, setShowEditor] = useState(true);
    const [showPreview, setShowPreview] = useState(false);
    const [proposalDescription, setProposalDescription] = useState(
        EditorState.createEmpty()
    );

    const {register, handleSubmit, errors} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    /**
     * shows the description editor
     * @function
     * @param {*} editorState the editor state
     */
    const onEditorStageChange = (editorState) => {
        setShowEditor(true);
        setProposalDescription(editorState);
    };

    /**
     * goes back on the step of proposal creation but first hides the preview and shows the editor
     * @function
     */
    const backEditor = () => {
        if (showPreview) {
            setShowPreview(false);
        }
        if (!showEditor) {
            setShowEditor(true);
        }
        onBack();
    };

    /**
     * checks if the editor is empty
     * @function
     * @param {*} editor the editor received to check if it's empty
     * @returns {boolean}
     */
    const editorEmpty = (editor) => {
        const editorRaw = convertToRaw(editor.getCurrentContent());
        if (editorRaw.blocks[0].text.trim().length === 0) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * goes next on the step of proposal creation but first hides the preview and shows the editor
     * @function
     * @param {{url: string}} data the data from the url input
     */
    const nextEditor = (data) => {
        if (showPreview) {
            setShowPreview(false);
        }
        if (!showEditor) {
            setShowEditor(true);
        }
        const descriptionRaw = draftToHtml(
            convertToRaw(proposalDescription.getCurrentContent())
        );

        onNext({proposalDescription: escape(descriptionRaw), ...data});
    };

    // Calculate character count for description
    const descriptionText = proposalDescription.getCurrentContent().getPlainText();
    const characterCount = descriptionText.length;

    return (
        <form className="input-form w-100" onSubmit={handleSubmit(nextEditor)}>
            <div className="form-group position-relative w-100">
                {showEditor && (
                    <>
                        <div style={{position: 'relative', display: 'block'}}>
                            <Editor
                            editorState={proposalDescription}
                            onEditorStateChange={onEditorStageChange}
                            wrapperClassName="proposalEditor-wrapper article"
                            editorClassName="proposal-editor input-glass"
                            toolbar={{
                                options: ["inline", "list"],
                                inline: {
                                    options: ["bold", "italic", "underline", "monospace"],
                                },
                                list: {
                                    options: ["unordered", "ordered"],
                                },
                            }}
                            toolbarClassName="editor-toolbar-transparent"
                            toolbarStyle={{borderRadius: "0.1875rem", color: "#0f1f1f", background: 'transparent', border: 'none'}}
                            editorStyle={{
                                paddingTop: '0.75rem',
                                paddingBottom: '0.75rem',
                                paddingLeft: '0.75rem',
                                paddingRight: '0.75rem',
                                color: "#ffffff",
                                textAlign: 'left',
                                minHeight: '12.5rem'
                            }}
                        />
                            <button
                                type="button"
                                className="preview-button"
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1rem',
                                    zIndex: 20,
                                    fontSize: '0.875rem',
                                    padding: '0.25rem 2rem',
                                    lineHeight: '1rem',
                                    borderRadius: '1000px',
                                    border: '0.0625rem solid #ffffff',
                                    background: 'transparent',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                    fontFamily: '"DM Sans", sans-serif',
                                    fontWeight: '500'
                                }}
                                onClick={() => {
                                    setShowPreview(true);
                                    setShowEditor(false);
                                }}
                            >
                                Preview
                            </button>
                            <small
                                style={{
                                    position: 'absolute',
                                    top: '4rem',
                                    right: '1rem',
                                    color: '#9fa6b0',
                                    fontSize: '0.875rem',
                                    zIndex: 10,
                                    pointerEvents: 'none'
                                }}
                            >
                                {characterCount}/1000
                            </small>
                        </div>
                        {editorEmpty(proposalDescription) && (
                            <small>
                                <p style={{lineHeight: "1.5"}}>The description is required</p>
                            </small>
                        )}
                    </>
                )}

                {showPreview && (
                    <>
                        <div style={{position: 'relative', display: 'block'}}>
                            <button
                                type="button"
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1rem',
                                    zIndex: 20,
                                    fontSize: '0.875rem',
                                    padding: '0.25rem 2rem',
                                    lineHeight: '1rem',
                                    borderRadius: '1000px',
                                    border: '0.0625rem solid #ffffff',
                                    background: 'transparent',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                    fontFamily: '"DM Sans", sans-serif',
                                    fontWeight: '500'
                                }}
                                onClick={() => {
                                    setShowPreview(false);
                                    setShowEditor(true);
                                }}
                            >
                                Editor
                            </button>
                        </div>
                        <div className="proposals">
                            <div className="proposal">
                                <div
                                    className="proposalContent-div"
                                    id="preview-html-container"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            draftToHtml(
                                                convertToRaw(proposalDescription.getCurrentContent())
                                            ),
                                            {ALLOWED_TAGS: ['p', '#text']}
                                        ),
                                    }}
                                    style={{margin: "0 10px"}}
                                ></div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="form-group w-100">
                <label htmlFor="proposalUrl">URL</label>
                <input
                    type="url"
                    placeholder="https://support.syscoin.org/example-proposal"
                    className="form-control input-glass w-100"
                    name="proposalUrl"
                    id="proposalUrl"
                    ref={register}
                    required
                />
                <ErrorMessage
                    errors={errors}
                    name="proposalUrl"
                    render={({message}) => (
                        <small>
                            <p style={{lineHeight: "1.5"}}>{message}</p>
                        </small>
                    )}
                />
            </div>

            <div className="form-actions-spaced d-flex gap-2 justify-content-start">
                <button
                    className="btn btn-white-outline btn-chevron-left"
                    type="button"
                    onClick={backEditor}
                >
                    Back
                </button>

                <button
                    className="btn btn-white btn-chevron-right"
                    type="submit"
                    disabled={editorEmpty(proposalDescription) || characterCount > 1000}
                >
                    Next
                </button>
            </div>
        </form>
    );
}

export default DescriptionProposal;
