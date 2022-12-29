import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex} from "ethereum-cryptography/utils";


function Transfer({ address, setBalance, privateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
 
 function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    return keccak256(bytes);
    
 }
  async function transfer(evt) {
    evt.preventDefault();
    const message = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    };
    const hash = hashMessage(JSON.stringify(message));
    const [sig, recoveryBit] = await secp.sign(hash,privateKey,{recovered: true});
    message.sign=toHex(sig);
    message.recoveryBit=recoveryBit;

    console.log('request:', message)

    try {
      const {
        data: { balance },
      } = await server.post(`send`, message);
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;