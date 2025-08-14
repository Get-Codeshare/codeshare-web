"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useTheme } from "@/contexts/ThemeContext";
import { SciFiButton } from "@/components/ui/scifi-button";
import { cn } from "@/lib/utils";

interface CodeViewerProps {
  title: string;
  code: string | null;
  language: string | null;
  startingLineNumber?: number;
  error?: string | null;
  className?: string;
}

export default function CodeViewer({
  title,
  code,
  language,
  startingLineNumber = 1,
  error,
  className,
}: CodeViewerProps) {
  const [copyText, setCopyText] = useState("Copy");
  const { theme } = useTheme();

  const handleCopy = () => {
    if (code && !error) {
      navigator.clipboard.writeText(code);
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy"), 2000);
    }
  };

  // Create custom syntax highlighting styles with pure grey backgrounds
  const customDarkStyle = {
    ...atomOneDark,
    hljs: {
      ...atomOneDark.hljs,
      background: theme === "dark" ? "#1a1a1a" : "#f5f5f5",
      color: theme === "dark" ? "#e5e5e5" : "#1a1a1a",
    },
  };

  const customLightStyle = {
    ...atomOneLight,
    hljs: {
      ...atomOneLight.hljs,
      background: "#f5f5f5",
      color: "#1a1a1a",
    },
  };

  return (
    <div className={cn("w-full mx-auto", className)}>
      <div className="relative inline-block w-full">
        {/* Main container with sci-fi styling */}
        <div
          className={cn(
            "relative w-full overflow-hidden",
            "rounded border border-border",
            "bg-card/50 backdrop-blur-sm",
            "shadow-[0px_-82px_68px_-109px_inset_rgba(255,255,255,0.1),0px_98px_100px_-170px_inset_rgba(255,255,255,0.2),0px_4px_18px_-8px_inset_rgba(255,255,255,0.2),0px_1px_40px_-14px_inset_rgba(255,255,255,0.1)]"
          )}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-muted/30">
            <span className="font-mono text-sm text-foreground/80">
              {title}
            </span>
            <SciFiButton
              onClick={handleCopy}
              disabled={!!error || !code}
              size="sm"
            >
              {copyText}
            </SciFiButton>
          </div>

          {/* Content */}
          {error ? (
            <div className="p-8 text-center">
              <div className="text-foreground/60 font-mono text-sm">
                {error}
              </div>
            </div>
          ) : (
            <div
              className="relative"
              style={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "#f5f5f5",
              }}
            >
              <SyntaxHighlighter
                language={language || "plaintext"}
                style={theme === "dark" ? customDarkStyle : customLightStyle}
                showLineNumbers={!!startingLineNumber}
                startingLineNumber={startingLineNumber}
                customStyle={{
                  margin: 0,
                  padding: "2rem",
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "#f5f5f5",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
                codeTagProps={{
                  style: {
                    fontFamily:
                      "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                  },
                }}
              >
                {code || "Loading code..."}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
