//new article page
const article_page = document.getElementById("article_page")
if (article_page) {
    const article_content = article_page.querySelector(".article_content")

    //summary
    const summary = article_content.querySelector(".js-summary")
    const summary_topics = summary.querySelector(".js-topics")
    const summary_titles = article_content.querySelectorAll(".js-title")

    if (summary_titles.length === 0) summary.remove()
    
    const keyword = "summary-"
    summary_titles.forEach((title, i) => {
        title.id = keyword + i;
    })
    const elements = Array.from(summary_titles).map((t,i) => {
        const el = document.createElement("a")
        el.innerText = t.innerText
        el.href = "#" + keyword + i
        return el
    })
    elements.forEach(e => summary_topics.appendChild(e))

    //code blocks
    const code_blocks = article_content.querySelectorAll(".code_block")
    code_blocks.forEach(block => {
        const copy_btn = block.querySelector(".js-copy")
        const code = block.querySelector("code")
        copy_btn.onclick = () => {
            const text_part = copy_btn.querySelector(".js-text")
            const old_text = text_part.innerText;
            text_part.innerText = "کپی شد!";
            copy_btn.classList.add("success");
            navigator.clipboard.writeText(code.innerText);
            
            setTimeout(() => {
                text_part.innerText = old_text;
                copy_btn.classList.remove("success");
            }, 2000);
        }
    })
    
    const copy_page = article_page.querySelector(".article_head .js-copyPage")
    if (copy_page) {
        copy_page.onclick = () => {
            navigator.clipboard.writeText(window.location.href)
        }
    }

    const anchors = article_page.querySelectorAll('a[href^="#"]')
    anchors.forEach(anchor => {
        anchor.onclick = e => {
            e.preventDefault()
            const id = anchor.getAttribute("href").substring(1)
            if (!id) return
            const target = document.getElementById(id)
            if (!target) return
            target.scrollIntoView()
        }
    })

    const next_prev = article_page.querySelector(".article_next_prev")
    if (next_prev) {

        window.onscroll = () => {
            if (next_prev.getBoundingClientRect().bottom > (window.innerHeight-1) ) 
                next_prev.classList.add("stuck")
            else
                next_prev.classList.remove("stuck")
        }
    }
} else console.error("#article_page not found. probably wrong js file imported.")