import { useCallback, useMemo, useRef, useState } from 'react';

type SpeechRecognitionCtor = new () => {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: {
    resultIndex: number;
    results: ArrayLike<ArrayLike<{ transcript: string }>>;
  }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

interface UseComposerEnhancementsOptions {
  onAppendText: (text: string) => void;
}

export function useComposerEnhancements({ onAppendText }: UseComposerEnhancementsOptions) {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionCtor> | null>(null);

  const browserSpeechRecognition = useMemo<SpeechRecognitionCtor | null>(() => {
    if (typeof window === 'undefined') return null;
    const browserWindow = window as Window & {
      webkitSpeechRecognition?: SpeechRecognitionCtor;
      SpeechRecognition?: SpeechRecognitionCtor;
    };
    return browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition ?? null;
  }, []);

  const toggleVoiceInput = useCallback(() => {
    if (!browserSpeechRecognition) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const recognition = new browserSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .slice(event.resultIndex)
        .flatMap((result) => Array.from(result))
        .map((result) => result.transcript)
        .join(' ')
        .trim();

      if (transcript) {
        onAppendText(transcript);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  }, [browserSpeechRecognition, isListening, onAppendText]);

  const appendFiles = useCallback((fileList: FileList | null) => {
    if (!fileList?.length) return;
    setAttachments((prev) => [...prev, ...Array.from(fileList)]);
  }, []);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const openImagePicker = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  const removeAttachment = useCallback((index: number) => {
    setAttachments((prev) => prev.filter((_, fileIndex) => fileIndex !== index));
  }, []);

  const clearAttachments = useCallback(() => {
    setAttachments([]);
  }, []);

  return {
    attachments,
    isListening,
    browserSpeechSupported: Boolean(browserSpeechRecognition),
    fileInputRef,
    imageInputRef,
    toggleVoiceInput,
    appendFiles,
    openFilePicker,
    openImagePicker,
    removeAttachment,
    clearAttachments,
  };
}
