const USERS='myblog_users', POSTS='myblog_posts', SESSION='myblog_session';
const read=(key)=>JSON.parse(localStorage.getItem(key)||'[]');
const user=()=>JSON.parse(localStorage.getItem(SESSION)||'null');
const writePosts=(items)=>localStorage.setItem(POSTS,JSON.stringify(items));
const safe=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.querySelectorAll('.year').forEach(x=>x.textContent=new Date().getFullYear());
document.querySelectorAll('#logout').forEach(b=>b.onclick=()=>{localStorage.removeItem(SESSION);location.href='index.html';});
function requireUser(){if(!user()){location.href='login.html';return false;}return true;}
const reg=document.getElementById('register-form');
if(reg)reg.onsubmit=e=>{e.preventDefault();let users=read(USERS),email=document.getElementById('reg-email').value.trim().toLowerCase();if(users.some(x=>x.email===email)){document.getElementById('register-message').textContent='Email already registered. Please login.';return;}let u={name:document.getElementById('reg-name').value.trim(),email,password:document.getElementById('reg-password').value};users.push(u);localStorage.setItem(USERS,JSON.stringify(users));localStorage.setItem(SESSION,JSON.stringify({name:u.name,email:u.email}));location.href='dashboard.html';};
const login=document.getElementById('login-form');
if(login)login.onsubmit=e=>{e.preventDefault();let email=document.getElementById('login-email').value.trim().toLowerCase(),password=document.getElementById('login-password').value,u=read(USERS).find(x=>x.email===email&&x.password===password);if(!u){document.getElementById('login-message').textContent='Incorrect email or password.';return;}localStorage.setItem(SESSION,JSON.stringify({name:u.name,email:u.email}));location.href='dashboard.html';};
function card(p){return `<article class="post">${p.image?`<img src="${safe(p.image)}" alt="Blog image">`:''}<small>${safe(p.category)}</small><h3>${safe(p.title)}</h3><p>${safe(p.content.slice(0,140))}${p.content.length>140?'...':''}</p><small>By ${safe(p.author)}</small></article>`;}
const home=document.getElementById('home-posts');
if(home){let posts=read(POSTS).sort((a,b)=>b.createdAt-a.createdAt);home.innerHTML=posts.map(card).join('');document.getElementById('home-empty').style.display=posts.length?'none':'block';}
const dash=document.getElementById('my-posts');
if(dash&&requireUser()){let u=user(),posts=read(POSTS).filter(p=>p.email===u.email);document.getElementById('welcome').textContent='Welcome, '+u.name+'!';dash.innerHTML=posts.map(p=>`<article class="post">${card(p)}<button class="btn" data-delete="${p.id}">Delete</button></article>`).join('');document.getElementById('dashboard-empty').style.display=posts.length?'none':'block';dash.onclick=e=>{let id=e.target.dataset.delete;if(id&&confirm('Delete this post?')){writePosts(read(POSTS).filter(p=>p.id!==id));location.reload();}};}
const form=document.getElementById('blog-form');
if(form&&requireUser()){form.onsubmit=e=>{e.preventDefault();let u=user(),posts=read(POSTS);posts.unshift({id:String(Date.now()),title:document.getElementById('blog-title').value.trim(),category:document.getElementById('blog-category').value,image:document.getElementById('blog-image').value.trim(),content:document.getElementById('blog-content').value.trim(),author:u.name,email:u.email,createdAt:Date.now()});writePosts(posts);location.href='dashboard.html';};}
