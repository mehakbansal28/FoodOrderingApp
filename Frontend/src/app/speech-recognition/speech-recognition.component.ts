import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../shared/services/voice-recognition.service';

// export interface IWindow extends Window {
//   webkitSpeechRecognition: any;
// }

// declare interface SpeechRecognitionError extends Event {
//   error: string;
// }

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.scss']
})
export class SpeechRecognitionComponent implements OnInit {

  // recognitionResult: string = '';
  // recognition =  new webkitSpeechRecognition();
  // isStoppedSpeechRecog = false;
  // public text = '';
  // tempWords: any;

  // init() {

  //   this.recognition.interimResults = true;
  //   this.recognition.lang = 'en-US';

  //   this.recognition.addEventListener('result', (e:any) => {
  //     const transcript = Array.from(e.results)
  //       .map((result:any) => result[0])
  //       .map((result) => result.transcript)
  //       .join('');
  //     this.tempWords = transcript;
  //     console.log(transcript);
  //   });
  // }

  // start() {
  //   this.isStoppedSpeechRecog = false;
  //   this.recognition.start();
  //   console.log("Speech recognition started")
  //   this.recognition.addEventListener('end', (condition) => {
  //     if (this.isStoppedSpeechRecog) {
  //       this.recognition.stop();
  //       console.log("End speech recognition")
  //     } else {
  //       this.wordConcat()
  //       this.recognition.start();
  //     }
  //   });
  // }
  // stop() {
  //   this.isStoppedSpeechRecog = true;
  //   this.wordConcat()
  //   this.recognition.stop();
  //   console.log("End speech recognition")
  // }

  // wordConcat() {
  //   this.text = this.text + ' ' + this.tempWords + '.';
  //   this.tempWords = '';
  // }

  //ngOnInit() {
  //  this.recognition = new annyang();
  //   this.recognition.addCallback('result', (phrases: string[]) => {
  //     this.recognitionResult = phrases[0];
  //   });
  //   this.recognition.start();
  //}
  
  
  
  

  // recognition: any;
  // transcript: string = '';

  // constructor() {
  //   const {webkitSpeechRecognition} : IWindow = <IWindow><unknown>window;
  //   if (!('webkitSpeechRecognition' in window)) {
  //     alert("Speech recognition not available");
  //     console.log('Web Speech API not supported in this browser');
  //     return;
  //   } else {
  //     this.recognition = new webkitSpeechRecognition();
  //     this.recognition.continuous = true;
  //     this.recognition.interimResults = true;
  //     this.recognition.lang = 'en-US';

  //     this.recognition.onresult = (event:any) => {
  //       let interimTranscript = '';
  //       for (let i = event.resultIndex; i < event.results.length; i++) {
  //         let transcript = event.results[i][0].transcript;
  //         if (event.results[i].isFinal) {
  //           this.transcript += transcript;
  //         } else {
  //           interimTranscript += transcript;
  //         }
  //       }
  //       console.log(this.transcript + interimTranscript);
  //     };
  //     this.recognition.onerror = function(event:any) {
  //       if (event.error == 'no-speech') {
  //         console.log('Error: no speech detected');
  //       }
  //       if (event.error == 'speech-not-allowed') {
  //         console.log('Error: speech not allowed');
  //       }
  //       if (event.error == 'audio-capture') {
  //         console.log('Error: microphone not available');
  //       }
  //       if (event.error == 'not-allowed') {
  //         console.log('Error: permission denied');
  //       }
  //       if (event.error == 'aborted') {
  //         console.log('Error: aborted');
  //       }
  //       // if (event.error instanceof SpeechRecognitionError) {
  //       //   console.log('Error: ' + event.error.message);
  //       // }
  //     };
  //   }
  // }

  // startRecognition() {
  //   this.recognition.start();
  // }

  // stopRecognition() {
  //   this.recognition.stop();
  // }

  constructor(
    public service : VoiceRecognitionService
  ) { 
    this.service.init()
   }

  ngOnInit(): void {
  }

  startService(){
    this.service.start()
  }

  stopService(){
    this.service.stop()
  }
}
