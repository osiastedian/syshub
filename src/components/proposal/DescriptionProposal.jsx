import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";

//import for text editor
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const schema = yup.object().shape({
  proposalUrl: yup.string().url('Must be a valid url')
});

export default function DescriptionProposal({onNext, onBack}) {
  const [showEditor, setShowEditor] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [proposalDescription, setProposalDescription] = useState(EditorState.createEmpty());

  const {register, handleSubmit, errors} = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (!showEditor) {
      let previewContainer = document.getElementById('preview-html-container');
      // previewContainer.innerHTML = draftToHtml(convertToRaw(proposalDescription.getCurrentContent()));
    }
  }, [showEditor])

  const onEditorStageChange = (editorState) => {
    setShowEditor(true);
    setProposalDescription(editorState);
  }

  const backEditor = () => {
    if (showPreview) {
      setShowPreview(false);
    }
    if (!showEditor) {
      setShowEditor(true);
    }
    onBack();
  }
  
  const editorEmpty = (editor) => {
    const editorRaw = convertToRaw(editor.getCurrentContent());
    if (editorRaw.blocks[0].text.trim().length === 0){
      return true
    }
    else {
      return false
    }
  }

  const nextEditor = (data) => {    
    const descriptionRaw = draftToHtml(convertToRaw(proposalDescription.getCurrentContent()));

    onNext({ proposalDescription: descriptionRaw, ...data });
  }

  return (
    <form className="input-form" onSubmit={handleSubmit(nextEditor)}>
      <div className="form-group">
        {
          showEditor && (
            <>
              <Editor
                editorState={proposalDescription}
                onEditorStateChange={onEditorStageChange}
                wrapperClassName="proposalEditor-wrapper article"
                editorClassName="proposal-editor styled"
                toolbar={{
                  options: ['inline', 'list'],
                  inline: {
                    options: ['bold', 'italic', 'underline', 'monospace'],
                    list: {
                      options: ['unordered', 'ordered']
                    }
                  }
                }}
                toolbarClassName="toolbarClassName"
                toolbarStyle={{ borderRadius: '3px' }}
                editorStyle={{ paddingTop: 0, paddingBottom: 0 }}
              />
              {
                editorEmpty(proposalDescription) && <small>
                  <p style={{ lineHeight: '1.5' }}>The description is required</p>
                </small>
              }
            </>
          )
        }

        {
          showPreview && (
            <div
              className="proposalContent-div"
              id="preview-html-container"
              dangerouslySetInnerHTML={{
                __html: draftToHtml(convertToRaw(proposalDescription.getCurrentContent()))
              }}
            ></div>
          ) 
        }
      </div>

      <div className="form-group">
        <label htmlFor="proposalUrl">URL</label>
        <input
          type="url"
          placeholder="Keep it blank to proposal refers itself"
          className="styled"
          name="proposalUrl"
          id="proposalUrl"
          ref={register}
        />
        <ErrorMessage
          errors={errors}
          name="proposalUrl"
          render={({ message }) => <small><p style={{lineHeight:'1.5'}}>{message}</p></small>}
        />
      </div>

      <div className="form-actions-spaced">
        <button className="btn btn--blue-border" type="button" onClick={backEditor}>Back</button>

        {
          showEditor && <button
            className="btn btn--blue-border"
            onClick={() => {
              console.log('entro aqui')
              setShowPreview(true);
              setShowEditor(false);
            }}
          >
            Preview
          </button>
        }
        {
          showPreview && <button
            className="btn btn--blue-border"
            onClick={() => {
              setShowPreview(false);
              setShowEditor(true);
            }}
          >
            Editor
          </button>
        }
        
        <button className="btn btn--blue" type="submit" disabled={editorEmpty(proposalDescription)}>Next</button>
        
      </div>
    </form>
  )
}