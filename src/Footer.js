import React, { useState, useEffect } from 'react';

const RED = "#ff0000"
const BLUE = "#0000ff"
const GRAY = "#678c89"

function Footer(props) {
    const [submitThemeColor, setSubmitThemeColor] = useState("")

    const themeColor = (color) => {
        if (color) {
            console.log(`handleChangeTheme`)
            props.saveColorTheme(color);
        }
    }
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--main-color",
            props.themeColor.color
        );
    },[props.themeColor])

    const componentWillReceiveProps = (nextprops) => {
        console.log(
            "UNSAFE_componentWillReceiveProps: " + JSON.stringify(nextprops)
        );
        document.documentElement.style.setProperty(
            "--main-color",
            nextprops.themeColor.color
        );
    }

    return (
        <div className="footer">
            <div className="vertical-center">
                <span>Choose Theme</span>
                <button className="dot red" onClick={() => themeColor(RED)} />
                <button className="dot blue" onClick={() => themeColor(BLUE)} />
                <button className="dot gray" onClick={() => themeColor(GRAY)} />
            </div>
        </div>
    )
}

export default Footer