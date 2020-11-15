import React from 'react'

function Steps(props) {
    return (
        <div className ="steps">
           <div className={props.step1 ? 'active' : ''} >Step 1</div>
            <div className={props.step2 ? 'active' : ''} >Step 2</div>
            <div className={props.step3 ? 'active' : ''} >Step 3</div>
           
        </div>
    )
}

export default Steps
