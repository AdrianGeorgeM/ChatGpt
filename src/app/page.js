"use client";

import styles from "./page.module.css";
import { useState } from "react";
import PromptForm from "@/components/PromptForm";

export default function Home() {
  const [choices, setChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <p>Chat-GPT is thrilled to see you...</p>
        <PromptForm
          isLoading={isLoading}
          onSubmit={async (prompt) => {
            setIsLoading(true);
            const response = await fetch("/api/chat-gpt", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt,
              }),
            });

            setIsLoading(false);
            const result = await response.json();
            setChoices(result.choices);
          }}
        />

        {choices.map((choice) => {
          console.log(choice);
          return (
            <p className={styles.response} key={choice.index}>
              {choice.message.content}
            </p>
          );
        })}
      </div>
    </main>
  );
}
