<template>
  <div id="nav">
    <div id="nav-items">
      <ul>
        <li><h1>Genkan</h1></li>
        <li><router-link to="/chat"><i class="fas fa-comments"></i></router-link></li>
        <li><router-link to="/stories"><i class="fas fa-book-open"></i></router-link></li>
        <li><router-link to="/search"><i class="fas fa-globe"></i></router-link></li>
        <li><router-link to="/passport"><i class="fas fa-user-circle"></i></router-link></li>
        <li><router-link to="/logout"><i class="fas fa-sign-out-alt"></i></router-link></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  #nav {
    position: relative;
    width: 100px;
    height: 100vh;
    min-height: 100%;
    border-right: #8c7ae6 2px solid;
    float: left;
  }

  #nav-items {
    margin-top: 30px;
    height: 100% - 30px;
  }
    
  h1 {
    font-family: 'Sriracha', cursive;
    font-size: 2.4rem;
    text-decoration: none;
    color: #9c88ff
  }

  ul {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0;  
    margin: 30px 0 30px;
    list-style: none;
  }

  li:last-child {
    position: absolute;
    bottom: 0;
  }

  a {
    padding: 2rem;
    font-size: 2.6rem;
    font-weight: bold;
    color: #fff;
    text-decoration-line: none;
  }

  a:last-child {
    margin-top: auto !important;
  }

  .router-link-exact-active {
    color: #9c88ff;
  }
</style>