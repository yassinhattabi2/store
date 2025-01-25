import{j as e,H as x,a4 as c,a1 as h,a2 as p,t as u}from"./index-DL1FNKyW.js";import{C as g,a as j,G as f,B as i,S as n,T as t,F as b,b as y,I as S,c as v,e as k,d as C}from"./ErrorOutline-BoL6s-YJ.js";import{E as w}from"./appbar-CV8vv-7y.js";import{L as F}from"./Link-CMeVH5kI.js";const E=k({defaultColorScheme:"dark"}),T=h().shape({email:p().email("Invalid email format").required("Email is required")}),R=({message:o})=>e.jsxs(i,{sx:{display:"flex",alignItems:"center",backgroundColor:"rgba(255, 0, 0, 0.1)",color:"red",padding:"8px 12px",borderRadius:"4px",marginTop:"4px"},children:[e.jsx(C,{sx:{marginRight:1}}),e.jsx(t,{level:"body-xs",children:o})]});function P(){const o=async(s,a)=>{try{const r=await u.post("http://localhost:5000/api/forgot-password",{email:s.email});alert(`Reset link sent to ${s.email}`),a.setSubmitting(!1)}catch(r){console.error("Error sending reset link:",r),alert("email not found"),a.setSubmitting(!1)}};return e.jsxs(e.Fragment,{children:[e.jsx(x,{children:e.jsx("title",{children:"Forget Password"})}),e.jsx(w,{}),e.jsxs(g,{theme:E,disableTransitionOnChange:!0,children:[e.jsx(j,{}),e.jsx(f,{styles:{":root":{"--Form-maxWidth":"800px","--Transition-duration":"0.4s"}}}),e.jsx(i,{sx:s=>({width:{xs:"100%",md:"50vw"},transition:"width var(--Transition-duration)",transitionDelay:"calc(var(--Transition-duration) + 0.1s)",position:"relative",zIndex:1,marginLeft:"25%",display:"flex",justifyContent:"flex-end",backdropFilter:"blur(12px)",backgroundColor:"rgba(255 255 255 / 0.2)",[s.getColorSchemeSelector("dark")]:{backgroundColor:"rgba(19, 19, 24, 0.4)"}}),children:e.jsx(i,{sx:{display:"flex",flexDirection:"column",minHeight:"100dvh",width:"100%",px:2},children:e.jsxs(i,{component:"main",sx:{my:"auto",py:2,pb:5,display:"flex",flexDirection:"column",gap:2,width:400,maxWidth:"100%",mx:"auto",borderRadius:"sm","& form":{display:"flex",flexDirection:"column",gap:2}},children:[e.jsx(n,{sx:{gap:4,mb:2},children:e.jsxs(n,{sx:{gap:1},children:[e.jsx(t,{component:"h1",level:"h3",children:"Forgot Password"}),e.jsx(t,{level:"body-sm",children:"Enter your email address to receive a reset link."})]})}),e.jsx(c,{initialValues:{email:""},validationSchema:T,onSubmit:o,children:({handleSubmit:s,handleChange:a,values:r,errors:l,touched:d,isSubmitting:m})=>e.jsxs("form",{onSubmit:s,children:[e.jsxs(b,{required:!0,children:[e.jsx(y,{children:"Email"}),e.jsx(S,{type:"email",name:"email",value:r.email,onChange:a,error:d.email&&!!l.email}),d.email&&l.email&&e.jsx(R,{message:l.email})]}),e.jsxs(n,{sx:{gap:4,mt:2},children:[e.jsx(v,{type:"submit",fullWidth:!0,disabled:m,children:m?"Sending...":"Send Reset Link"}),e.jsxs(t,{level:"body-sm",children:["Remembered your password?"," ",e.jsx(F,{href:"auth/register",level:"title-sm",children:"Sign in!"})]})]})]})})]})})})]})]})}export{P as default};
