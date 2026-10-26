import type { ReactNode } from "react";
import styles from "../practical-exam.module.css";

// Render the text, code, tables and lists used in the study data.
// Source HTML is never injected into the document.
function unescapeMarkdown(text: string) {
  return text.replace(/\\([\\`*{}_\[\]()#+.!<>~^|])/g, "$1");
}

function inline(text: string): ReactNode[] {
  const normalized = text
    .replace(/<\/?b>/g, "**")
    .replace(/<\/?code>/g, "`")
    .replace(/<\/?i>/g, "")
    .replace(/<br\s*\/?\s*>/g, "\n");
  return normalized.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{unescapeMarkdown(part.slice(1, -1))}</code>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{unescapeMarkdown(part.slice(2, -2))}</strong>;
    const link = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/.exec(part);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer">{unescapeMarkdown(link[1])}</a>;
    return unescapeMarkdown(part);
  });
}

function isTableLine(line: string) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function cells(line: string) {
  return line.trim().slice(1, -1).split(/(?<!\\)\|/).map(cell => cell.trim());
}

export function StudyMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim() || /^<\/?(?:ul|ol|li)>$|^<p\s*\/>$/.test(line.trim())) {
      index++;
      continue;
    }

    if (line.trim().startsWith("```")) {
      const language = line.trim().slice(3);
      const code: string[] = [];
      index++;
      while (index < lines.length && !lines[index].trim().startsWith("```")) code.push(lines[index++]);
      index++;
      // Normalize display-only Markdown escapes and links in code blocks.
      const text = unescapeMarkdown(code.join("\n").replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, "$1"));
      blocks.push(<div className={styles.codeBlock} key={blocks.length}><div className={styles.codeLanguage}>{language || "CODE"}</div><pre><code>{text}</code></pre></div>);
      continue;
    }

    if (isTableLine(line) && index + 1 < lines.length && /^\|[\s:|\-]+\|$/.test(lines[index + 1].trim())) {
      const headers = cells(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && isTableLine(lines[index])) rows.push(cells(lines[index++]));
      blocks.push(<div key={blocks.length} className={styles.tableScroll} role="region" aria-label="문제 또는 풀이 표" tabIndex={0}><table><thead><tr>{headers.map((cell, cellIndex) => <th scope="col" key={cellIndex}>{inline(cell)}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }

    const heading = /^#{1,6}\s+(.+)$/.exec(line);
    if (heading) {
      blocks.push(<h4 key={blocks.length}>{inline(heading[1])}</h4>);
      index++;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const pattern = ordered ? /^\s*\d+\.\s+/ : /^\s*[-*]\s+/;
      const items: string[] = [];
      while (index < lines.length && pattern.test(lines[index])) items.push(lines[index++].replace(pattern, ""));
      const children = items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>);
      blocks.push(ordered ? <ol key={blocks.length}>{children}</ol> : <ul key={blocks.length}>{children}</ul>);
      continue;
    }

    const paragraph = [line];
    index++;
    while (index < lines.length && lines[index].trim() && !/^(?:```|#{1,6}\s|\s*[-*]\s|\s*\d+\.\s|\||<\/?(?:ul|ol|li)>|<p\s*\/>)/.test(lines[index])) paragraph.push(lines[index++]);
    blocks.push(<p key={blocks.length}>{inline(paragraph.join("\n"))}</p>);
  }

  return <div className={styles.markdown}>{blocks}</div>;
}
