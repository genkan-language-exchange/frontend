<template>
  <div>
    <header>
      <div>
        <h1 class="jp-title">言<span style="color: var(--gk-font-color);">語交</span>換</h1>
        <h1>Genkan</h1>
      </div>
    </header>
    <h2>Open Source Language Exchange</h2>
    <section class="content">
      <div>
        <h2>Why use <span class="purple">Genkan</span>?</h2>
        <p><span class="purple">Practice</span> a second <span class="purple">language</span> by reading or writing "stories".</p>
        <p>Create mini-lessons to share your language, or <span class="purple">share</span> your <span class="purple">culture</span> with others.</p>
      </div>

      <div>
        <h2>What is "<span class="purple">Genkan</span>"?</h2>
        <p>"Genkan" is a shortening of "<span class="purple">gen</span>go kou<span class="purple">kan</span>" (<span class="jp-font"><span class="purple">言</span>語交<span class="purple">換</span></span>), which is Japanese for "language exchange".</p>
        <p>Coincidentally, "Genkan" (<span class="jp-font">玄関</span>) also means "front door" or "entryway".</p>
        <p>Think of us as your <span class="purple">door</span> to <span class="purple">language exchange</span> 😉</p>
      </div>
    </section>
    <section class="get-started">
      <div>
        <TextButton
          @click="$router.push('/login')"
        >
          Get Started!
        </TextButton>
      </div>
    </section>
    <section class="disclaimer">
      <div>
        <a href="https://github.com/genkan-language-exchange" target="_"><h3 class="purple bit-crush">Genkan is in early Alpha.</h3></a>
        <aside>Layout changes, missing/incomplete features, etc. should be expected.</aside>
      </div>
    </section>
    <footer>
      <TheFooter />
    </footer>
  </div>
</template>

<script>
  import TextButton from '../components/TextButton'
  import TheFooter from '../components/TheFooter'
  export default {
    components: {
      TextButton,
      TheFooter
    }
  }
</script>

<style scoped>
header {
  position: relative;
  padding: 15px;
  border-bottom: 2px solid var(--theme-color-main);
}
header div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
h1 {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  color: var(--theme-color-main);
  font-size: 3.4rem;
  margin: 0;
}
h2 {
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
  font-size: 2.8rem;
}
.jp-title, .jp-font {
  font-family: "Noto Sans JP", Arial, Helvetica, sans-serif;
}
.purple {
  color: var(--theme-color-main);
}
.bit-crush {
  font-family: "Dot Gothic", Arial, Helvetica, sans-serif;
}
p .bit-crush {
  font-size: 2rem;
}
a {
  text-decoration: none;
}
a:hover { color: var(--theme-color-secondary); }
.content {
  padding: 10px;
  text-align: left;
  background-color: var(--bg-color-secondary);
  box-sizing: border-box;
}
.content>div:last-child {
  border-top: 2px solid var(--theme-color-main);
  padding-top: 20px;
  margin-top: 10px;
}
section h2, section h3, section p {
  margin: 0;
  padding: 0;
}
section p {
  padding: 8px 0;
}
.content p {
  line-height: 1.5;
  font-size: 2rem;
}
.get-started button {
  font-size: 2.4rem;
}
.disclaimer {
  margin-bottom: 100px;
}
aside {
  font-size: 1.2rem;
}
@media (min-width: 750px) {
  header div {
    justify-content: space-around;
  }
  .content {
    width: 60%;
    margin: 0 auto;
    border-radius: 8px;
    padding: 25px;
  }
  .get-started {
    margin: 30px 0;
  }
  .disclaimer h3 {
    font-size: 3rem;
    text-decoration: underline;
  }
  aside {
    font-size: 1.6rem;
  }
}
</style>