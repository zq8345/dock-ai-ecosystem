// protect-internal.ts — Netlify Edge Function:服务器层 Basic Auth
// 保护内部控制台页面 + 它读取的数据 JSON,防止全网公开访问/下载。
// 这是真正的鉴权(在 CDN 边缘拦截),不是前端登录框那种摆设。
//
// 注意:此文件由 Netlify 用 Deno 运行时单独打包,不属于 Next 应用。
// 用内联类型(不从 URL 导入)以免被 Next 的 tsc 当成普通模块解析报错。
//
// 启用:在 Netlify 站点 Settings → Environment variables 设置
//   MC_USER = 你的用户名
//   MC_PASS = 你的强密码
// 部署后访问 /internal/* 或 mission-control-data.json 会先弹出浏览器登录框。

// Netlify 边缘运行时(Deno)全局
declare const Deno: { env: { get(key: string): string | undefined } };
type EdgeContext = { next: () => Promise<Response> };

export default async (request: Request, context: EdgeContext): Promise<Response> => {
  const user = Deno.env.get("MC_USER");
  const pass = Deno.env.get("MC_PASS");

  // 未配置账号密码时,为安全起见直接锁死(避免误以为已保护其实裸奔)
  if (!user || !pass) {
    return new Response("Internal dashboard locked: MC_USER/MC_PASS not configured.", { status: 503 });
  }

  const expected = "Basic " + btoa(`${user}:${pass}`);
  const got = request.headers.get("authorization") || "";

  if (got !== expected) {
    return new Response("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="DockDocs Internal", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    });
  }
  return context.next(); // 通过鉴权,继续返回原始页面/文件
};

// 覆盖:内部页(含语言前缀)+ 控制台数据文件
export const config = {
  path: ["/internal/*", "/en/internal/*", "/zh/internal/*", "/mission-control-data.json"],
};
