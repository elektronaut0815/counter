import * as anchor from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { assert } from 'chai';

describe('counter', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  // Unfortunately, the following line does not work as expected.
  //const program = anchor.workspace.Counter as Program<Counter>;
  // Instead, we need to manually read the IDL and generate the program client.
  // Read the generated IDL.
  const idl = JSON.parse(require('fs').readFileSync('./target/idl/counter.json', 'utf8'));
  //Address of the deployed program - TODO: Update this with the deployed program address
  const programId = new anchor.web3.PublicKey('2WGocoPnfAsMh3HjJ1hqn3ZniFoymzKkHWorcAM3Bcro');
  if (!programId) {
    throw new Error('Counter programId is not initialized properly');
  }
  //Generate the program client from IDL
  const program = new anchor.Program(idl, programId);
  if (!program) {
    throw new Error('Counter program is not initialized properly');
  }

  const counterAccount = new Keypair();

  it('Is initialized!', async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        counter: counterAccount.publicKey,
      })
      .signers([counterAccount])
      .rpc({ skipPreflight: true });
    console.log('Your transaction signature', tx);
    const accountData = await program.account.counter.fetch(counterAccount.publicKey);
    assert.equal(accountData.count.toString(), '0');
  });

  it('Increment', async () => {
    // Invoke the increment instruction
    const tx = await program.methods
      .increment()
      .accounts({
        counter: counterAccount.publicKey,
      })
      .rpc();
    console.log('Your transaction signature', tx);
    const accountData = await program.account.counter.fetch(counterAccount.publicKey);
    console.log(`Count: ${accountData.count}`);
  });
});
