import { Amplify } from "aws-amplify"
import { signIn } from "aws-amplify/auth"
import outputs from "../../../../amplify_outputs.json"
import { useState } from "react";
import { useRouter } from 'next/navigation';
Amplify.configure(outputs);

export default function ConfirmSignInPage() {
    return(
        <>
            <form>
            
            </form>
        </>
    )
}