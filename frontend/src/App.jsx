import React from 'react'
import Interviewer from './components/Interviewer'


export default function App(){
return (
<div className="min-h-screen flex items-center justify-center">
<div className="w-full max-w-3xl p-6">
<h1 className="text-2xl font-bold mb-4">AI Interviewer</h1>
<Interviewer />
</div>
</div>
)
}