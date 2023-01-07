/**
 * @see https://beta.nextjs.org/docs/upgrade-guide#step-2-creating-a-root-layout
 * @see https://beta.nextjs.org/docs/routing/pages-and-layouts#root-layout-required
 * ルート レイアウトはアプリディレクトリの最上位で定義され、すべてのルートに適用されます。
 * このレイアウトを使用すると、サーバーから返される最初の HTML を変更できます。
 */
import { Session } from "next-auth";
import { Providers } from "./provider";

export default function RootLayout({
  children,
  session,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
