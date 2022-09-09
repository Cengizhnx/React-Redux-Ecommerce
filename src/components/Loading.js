import React from 'react'
import { Spinner } from "flowbite-react";

function Loading() {

    return (
        <div>
            <Spinner
                size="lg"
                color="info"
                aria-label="Info spinner example"
            />
        </div>
    )
}

export default Loading