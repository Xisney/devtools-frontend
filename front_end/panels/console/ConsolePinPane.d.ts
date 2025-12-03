import * as Common from '../../core/common/common.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as CodeMirror from '../../third_party/codemirror.next/codemirror.next.js';
import * as Buttons from '../../ui/components/buttons/buttons.js';
import * as TextEditor from '../../ui/components/text_editor/text_editor.js';
import * as UI from '../../ui/legacy/legacy.js';
export declare class ConsolePinPane extends UI.Widget.VBox {
    #private;
    private readonly liveExpressionButton;
    private readonly focusOut;
    private pinModel;
    private presenters;
    constructor(liveExpressionButton: UI.Toolbar.ToolbarButton, focusOut: () => void);
    willHide(): void;
    private contextMenuEventFired;
    private removeAllPins;
    removePin(presenter: ConsolePinPresenter): void;
    addPin(expression: string, userGesture?: boolean): void;
    private focusedPinAfterDeletion;
    wasShown(): void;
}
export interface ViewInput {
    expression: string;
    editorState: CodeMirror.EditorState;
    result: SDK.RuntimeModel.EvaluationResult | null;
    isEditing: boolean;
    onDelete: () => void;
    onPreviewHoverChange: (hovered: boolean) => void;
    onPreviewClick: (event: MouseEvent) => void;
}
export interface ViewOutput {
    deletePinIcon?: Buttons.Button.Button;
    editor?: TextEditor.TextEditor.TextEditor;
}
export declare const DEFAULT_VIEW: (input: ViewInput, output: ViewOutput, target: HTMLElement) => void;
export declare class ConsolePinPresenter extends UI.Widget.Widget {
    #private;
    private readonly pinPane;
    private readonly focusOut;
    readonly pin: ConsolePin;
    private readonly view;
    private readonly pinEditor;
    private editor?;
    private hovered;
    private lastNode;
    private deletePinIcon;
    constructor(pin: ConsolePin, pinPane: ConsolePinPane, focusOut: () => void, view?: (input: ViewInput, output: ViewOutput, target: HTMLElement) => void);
    wasShown(): void;
    willHide(): void;
    setHovered(hovered: boolean): void;
    expression(): string;
    focus(): Promise<void>;
    appendToContextMenu(contextMenu: UI.ContextMenu.ContextMenu): void;
    performUpdate(): void;
}
export declare class ConsolePinModel {
    #private;
    constructor(settings: Common.Settings.Settings);
    get pins(): ReadonlySet<ConsolePin>;
    add(expression: string): ConsolePin;
    remove(pin: ConsolePin): void;
    startPeriodicEvaluate(): void;
    stopPeriodicEvaluate(): void;
}
/**
 * Small helper interface to allow `ConsolePin` to retrieve the current working copy.
 */
interface ConsolePinEditor {
    workingCopy(): string;
    workingCopyWithHint(): string;
    isEditing(): boolean;
}
/**
 * A pinned console expression.
 */
export declare class ConsolePin extends Common.ObjectWrapper.ObjectWrapper<ConsolePinEvents> {
    #private;
    constructor(expression: string, onCommit: () => void);
    get expression(): string;
    get lastResult(): SDK.RuntimeModel.EvaluationResult | null;
    /** A short cut in case `lastResult` is a DOM node */
    get lastNode(): SDK.RemoteObject.RemoteObject | null;
    skipReleaseLastResult(): void;
    setEditor(editor: ConsolePinEditor): void;
    /**
     * Commit the current working copy from the editor.
     * @returns true, iff the working copy was commited as-is.
     */
    commit(): boolean;
    /** Evaluates the current working copy of the pinned expression. If the result is a DOM node, we return that separately for convenience.  */
    evaluate(executionContext: SDK.RuntimeModel.ExecutionContext): Promise<void>;
}
export declare const enum ConsolePinEvent {
    EVALUATE_RESULT_READY = "EVALUATE_RESULT_READY"
}
export interface ConsolePinEvents {
    [ConsolePinEvent.EVALUATE_RESULT_READY]: ConsolePin;
}
export {};
