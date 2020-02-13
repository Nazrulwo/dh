import React, {Component} from 'react';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export class Component9 extends Component {
  render() {
    return(
      <div>
        <h3>Notice</h3>
        <DragAndDrop />
      </div>
    )
  }
}