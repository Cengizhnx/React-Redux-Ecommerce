import React from 'react'
import { getAuth } from "firebase/auth";


function ProductDetail() {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <div>
      {user && user.email}
      {!user && <div>SSS</div>}
    </div>
  )
}

export default ProductDetail