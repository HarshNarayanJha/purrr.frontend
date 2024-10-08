import AttachmentIcon from "@/assets/icons/attachment";
import CloseIcon from "@/assets/icons/close";
import SmileyIcon from "@/assets/icons/smiley";
import { Message } from "@/types/messages";
import { truncate } from "@/utils";
import Image from "next/image";
import { ChangeEventHandler, FormEventHandler, RefObject } from "react"

type ChatInputProps = {
    replyingTo: number | null;
    attachment: string;
    messages: Message[];
    fileinput: RefObject<HTMLInputElement>;
    message: RefObject<HTMLInputElement>;
    onSubmit: FormEventHandler<HTMLFormElement>;
    onFileChange: ChangeEventHandler<HTMLInputElement>;
    onMessageChange: ChangeEventHandler<HTMLInputElement>;
    clearAttachment(): void;
    replyTo(messageId: number | null): void;
}

export default function ChatInput({
    onSubmit, replyingTo, attachment, clearAttachment, messages, replyTo, fileinput, message, onFileChange, onMessageChange
}: ChatInputProps) {
    return (
        <form onSubmit={onSubmit} className="fixed bottom-[1em] w-[1080px] max-w-[95vw] bg-background rounded-b-[50px]" style={{
            borderTopLeftRadius: replyingTo !== null ? "0" : "50px",
            borderTopRightRadius: replyingTo !== null ? "0" : "50px",
        }}>
            {attachment.length > 0 && <div className="absolute -top-24 border-[1px] border-foreground rounded-lg">
                <button type="button" onClick={clearAttachment} className="bg-foreground font-[800] font-mono text-background text-[0.8em] w-5 h-5 flex justify-center items-center rounded-[50%] absolute -top-2 -right-2">
                    <CloseIcon width="18" fill="background" />
                </button>
                <Image src={decodeURIComponent(attachment)} alt="Image" width="0" height="0" sizes="100vw" className="w-[5em] h-[5em] rounded-lg object-cover" />
            </div>}
            {replyingTo !== null &&
                <div className="w-full h-16 border-foreground border-t-2 px-2">
                    <button type="button" onClick={() => replyTo(null)} className="bg-foreground font-[800] font-mono text-background text-[0.8em] w-5 h-5 flex justify-center items-center rounded-[50%] absolute -top-2 -right-2">
                        <CloseIcon width="18" fill="background" />
                    </button>
                    <p className="text-[0.8em] font-[300] pt-1">Replying to <span className="font-bold">{messages[replyingTo].from}</span></p>
                    <h3>{messages[replyingTo].image && "(Attachment)"} {truncate(messages[replyingTo].body)}</h3>
                </div>}
            <div className="flex items-center bg-background rounded-[50px] border-[1px] border-foreground p-2">
                <button type="button" className="mr-2 w-[30px] h-[30px] flex justify-center items-center rounded-md">
                    <SmileyIcon />
                </button>
                <button onClick={() => fileinput.current?.click()} type="button" className="mr-2 w-[25px] h-[25px] flex justify-center items-center rounded-md">
                    <input accept="image/*" onChange={onFileChange} ref={fileinput} type="file" className="hidden" />
                    <AttachmentIcon width="20" />
                </button>
                <input ref={message} onChange={onMessageChange} autoFocus className="bg-inherit flex-1 outline-none text-base" type="text" placeholder="Send a message" />
                <button className="text-sm px-4 rounded-md" type="submit">Send</button>
            </div>
        </form>
    )
}
