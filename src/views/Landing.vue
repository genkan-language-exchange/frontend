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
        <h2 style="margin: 10px 0;">Why use <span class="purple">Genkan</span>?</h2>
        <p><span class="purple">Practice</span> a second <span class="purple">language</span>, share your language, or <span class="purple">share</span> your <span class="purple">culture</span> with others.</p>
        <p><a class="purple bit-crush" href="https://github.com/genkan-language-exchange">Open source</a> so you can see what's going on behind the scenes.</p>
        <p>Emphasizes <span class="purple">privacy</span> features to prevent harassment.</p>
        <p><span class="purple">No ads</span> via direct message! (In fact, we have no ads at all currently!)</p>
        <div>
          <h2 style="margin: 10px 0;">What is "<span class="purple">Genkan</span>"?</h2>
          <p>"Genkan" is a shortening of "<span class="purple">gen</span>go-kou<span class="purple">kan</span>" (<span class="jp-font"><span class="purple">言</span>語交<span class="purple">換</span></span>), the Japanese word for "language exchange".</p>
          <p>Coincidentally, "Genkan" (<span class="jp-font">玄関</span>) also means "front door" or "entryway".</p>
          <p>Think of us as your <span class="purple">door</span> to <span class="purple">language exchange</span> 😉</p>
        </div>
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
        <h3 class="purple bit-crush">Genkan is in early Alpha.</h3>
        <p>Layout changes, missing/incomplete features, etc. should be expected.</p>
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
  padding: 10px;
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
  margin: 50px 0;
}
.jp-title {
  font-family: "Noto Sans JP", Arial, Helvetica, sans-serif;
}
.jp-font {
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
.content div div {
  border-top: 2px solid var(--theme-color-main);
  padding: 30px 0;
}
.content div div p {
  margin: 0 0 10px;
}
.content p {
  line-height: 1.5;
  margin: 20px 0;
  font-size: 2rem;
}
.get-started {
  margin: 30px 0 15px;
}
.get-started button {
  font-size: 2.4rem;
}
.disclaimer {
  margin-bottom: 100px;
}
.disclaimer h3 {
  margin: 0;
}
.disclaimer p {
  font-size: 1.2rem;
  margin: 10px;
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
  .content p {
    margin: 0 0 50px;
  }
  .get-started {
    margin: 90px 0 30px;
  }
  .disclaimer h3 {
    font-size: 3rem;
    text-decoration: underline;
  }
  .disclaimer p {
    font-size: 1.6rem;
  }
}
</style>