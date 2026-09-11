// 侧栏折叠 - 让"快速上手"、"配置说明"等分组标题变成可点击的折叠/展开
// 兼容 navigation.tabs 模式（Material 默认不支持，需要手工注入）

(function () {
  "use strict";

  // 等待 DOM 和 Material 主题加载完成
  document.addEventListener("DOMContentLoaded", function () {
    const navPrimary = document.querySelector(".md-nav--primary");
    if (!navPrimary) return;

    // 找顶层 <li> 项（每个分组，如"快速上手"）
    const topItems = navPrimary.querySelectorAll(
      "> ul > li.md-nav__item--section, > ul > li.md-nav__item"
    );
    if (topItems.length === 0) return;

    topItems.forEach(function (item) {
      // 如果已经被处理过，跳过
      if (item.querySelector(":scope > details.sidebar-collapse")) return;

      const titleLink = item.querySelector(":scope > label.md-nav__link, :scope > a.md-nav__link");
      const subList = item.querySelector(":scope > ul.md-nav__list");

      // 没有子项或子项只有一个（无折叠意义），跳过
      if (!titleLink || !subList || subList.children.length <= 1) {
        if (subList) {
          subList.style.display = ""; // 让默认样式接管
        }
        return;
      }

      // 创建 <details> 包裹
      const details = document.createElement("details");
      details.classList.add("sidebar-collapse");
      details.style.marginLeft = "0";

      // 判断当前页是否在这个分组下，默认展开
      const isActive =
        subList.querySelector(".md-nav__link--active") !== null ||
        titleLink.classList.contains("md-nav__link--active");

      if (isActive) {
        details.open = true;
      }

      // 创建 summary（折叠箭头）
      const summary = document.createElement("summary");
      summary.style.cursor = "pointer";
      summary.style.listStyle = "none";
      summary.style.padding = "0";
      summary.style.margin = "0";

      // 移除 <summary> 默认的三角符号
      summary.style.display = "block";

      // 把标题元素挪进 summary
      titleLink.style.cursor = "pointer";
      summary.appendChild(titleLink);

      // <details> 包住 summary + 子列表
      details.appendChild(summary);
      details.appendChild(subList);

      // 把整个 <li> 的内容换成 <details>
      item.appendChild(details);

      // 阻止 summary 点击时链接跳转（除非点了链接文字本身）
      summary.addEventListener("click", function (e) {
        if (e.target === summary) {
          e.preventDefault();
          details.open = !details.open;
        }
      });
    });

    // CSS 注入：去掉默认的 ::marker，让箭头用 emoji 或 ::before
    const style = document.createElement("style");
    style.textContent = `
      .sidebar-collapse > summary::marker,
      .sidebar-collapse > summary::-webkit-details-marker {
        display: none;
      }
      .sidebar-collapse > summary > .md-nav__link::before {
        content: "▶";
        display: inline-block;
        margin-right: 0.4rem;
        font-size: 0.6rem;
        transition: transform 0.2s ease;
        color: var(--md-default-fg-color--light);
      }
      .sidebar-collapse[open] > summary > .md-nav__link::before {
        transform: rotate(90deg);
      }
    `;
    document.head.appendChild(style);
  });
})();
