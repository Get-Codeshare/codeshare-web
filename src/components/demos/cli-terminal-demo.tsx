import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

const CLITerminalDemo = () => {
  return (
    // MODIFIED: Changed dark:bg-gray-900 to a custom darker color
    <Terminal className="bg-gray-100 dark:bg-[#121212] text-gray-800 dark:text-gray-200 font-mono text-[11px] max-w-full w-full h-full text-left">
      {/* Initial command */}
      <TypingAnimation
        className="text-cyan-600 dark:text-cyan-400 break-all"
        duration={50}
      >
        ~dev ❯ npm install -g get-codeshare
      </TypingAnimation>

      {/* Installation output */}
      <AnimatedSpan className="text-gray-700 dark:text-gray-300">
        changed 34 packages in 314ms
      </AnimatedSpan>
      {/* First codeshare command */}
      <TypingAnimation
        className="text-cyan-600 dark:text-cyan-400 break-all"
        duration={50}
      >
        ~/dev ❯ codeshare apps/web/app/layout.tsx:42-76
      </TypingAnimation>

      {/* Success message with checkmark */}
      <AnimatedSpan className="text-green-600 dark:text-green-400">
        ✅ Link (Git-aware) copied to clipboard!
      </AnimatedSpan>

      {/* Generated URL */}
      <AnimatedSpan className="text-blue-600 dark:text-blue-400 break-all">
        https://codeshare.sarthaks.tech/l/XBwL2xheW91dC50c3g/42-76
      </AnimatedSpan>
      {/* Final prompt with cursor */}
      <TypingAnimation className="text-cyan-600 dark:text-cyan-400" duration={100}>
        ~/dev ❯
      </TypingAnimation>
    </Terminal>
  );
};

export { CLITerminalDemo };