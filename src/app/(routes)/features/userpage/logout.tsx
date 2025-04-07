'use client'; 

import React, { useState } from 'react';
export default function LogOutButton() {
  const logOut = () => {
    window.location.href = '/api/auth/logout'; // Redirect to the logout API route
  };

  return (
    <div>
        <button type="button" className='' onClick={logOut}>
            Sign out
        </button>
    </div>
  );
}