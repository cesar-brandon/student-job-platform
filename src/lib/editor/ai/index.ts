import Paragraph from "@editorjs/paragraph";
import {
  TAITextApi,
  TAITextCSS,
  TAITextCallback,
  TAITextConstructor,
  TAITextData,
  TAITextElement,
  TAITextReadOnly,
} from "./aitext";
import { debounce } from "./lib";
import { toast } from "@/hooks/use-toast";

class AIText extends Paragraph {
  private callback: TAITextCallback;
  private _element?: TAITextElement;
  private _CSS?: TAITextCSS;
  private _data?: TAITextData;
  private readOnly: TAITextReadOnly = false;
  private api?: TAITextApi;

  static get toolbox() {
    return {
      title: "AI TEXT",
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
      `,
    };
  }

  constructor({ api, block, config, data }: TAITextConstructor) {
    super({
      api,
      block,
      config,
      data,
    });

    if (!config.callback) {
      throw new Error("Callback function is required!");
    }

    this.callback = config.callback;
  }

  getAICompletion(content: string) {
    if (!content) return;

    const loaderElement = document.createElement("div");
    loaderElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
      <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
    </svg>
    `;
    loaderElement.id = "ai-suggestions-loader";

    loaderElement.style.display = "inline-flex";
    loaderElement.style.alignItems = "center";
    loaderElement.style.width = "24px";
    loaderElement.style.height = "24px";
    loaderElement.style.paddingLeft = "4px";
    loaderElement.style.color = "#f97316";
    loaderElement.style.position = "absolute";

    loaderElement.animate(
      [
        {
          opacity: 0.5,
        },
        {
          opacity: 1,
        },
        {
          opacity: 0.5,
        },
      ],
      {
        duration: 1200,
        iterations: Infinity,
      },
    );

    this._element?.appendChild(loaderElement);

    this.callback?.(content)
      .then((response) => {
        const aiSuggestions = document.createElement("span");
        aiSuggestions.innerHTML = "";
        aiSuggestions.id = "ai-suggestions";
        aiSuggestions.style.color = "#f97316";
        aiSuggestions.innerHTML = response;

        this._element?.appendChild(aiSuggestions);

        this._element?.querySelector("#ai-suggestions-loader")?.remove();
      })
      .catch((error) => {
        toast({
          description: "Error al obtener sugerencias de IA",
          variant: "destructive",
        });
      });
  }

  onInput = debounce((e) => {
    if (
      this._element?.querySelector("#ai-suggestions") ||
      e.inputType === "deleteContentBackward" ||
      e.inputType === "deleteContentForward" ||
      e.inputType === "insertParagraph" ||
      e.inputType === "insertFromPaste" ||
      e.inputType === "insertFromDrop" ||
      !e.target.innerHTML
    ) {
      return;
    }

    this.getAICompletion(e.target.innerHTML);
  });

  onKeyUp(e: { code: string }) {
    if (e.code === "Escape" || e.code === "Backspace") {
      this._element?.querySelector("#ai-suggestions")?.remove();

      return;
    }

    if (e.code === "AltLeft" || e.code === "AltRight") {
      const aiSuggestionElement =
        this._element?.querySelector("#ai-suggestions");
      const aiSuggestionElementTextContent = aiSuggestionElement?.textContent;

      if (!aiSuggestionElementTextContent) return;

      const aiSuggestionTextNode = document.createTextNode(
        aiSuggestionElementTextContent,
      );

      this._element?.appendChild(aiSuggestionTextNode);
      aiSuggestionElement.remove();

      return;
    }

    if ((e.code !== "Backspace" && e.code !== "Delete") || !this._element) {
      return;
    }

    const { textContent } = this._element;

    if (textContent === "") {
      this._element.innerHTML = "";
    }
  }

  drawView() {
    const div = document.createElement("DIV");

    if (this._CSS?.wrapper) {
      div.classList.add(this._CSS.wrapper);
    }
    if (this._CSS?.block) {
      div.classList.add(this._CSS.block);
    }
    div.contentEditable = "false";
    div.dataset.placeholder = this.api?.i18n.t(this._placeholder);

    if (this._data?.text) {
      div.innerHTML = this._data.text;
    }

    if (!this.readOnly) {
      div.contentEditable = "true";
      div.addEventListener("keyup", this.onKeyUp);
      div.addEventListener("input", this.onInput);
    }

    return div;
  }

  private _placeholder(_placeholder: any): string | undefined {
    throw new Error("Method not implemented.");
  }
}

export default AIText;
