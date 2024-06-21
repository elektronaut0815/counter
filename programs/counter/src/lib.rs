use anchor_lang::prelude::*;

declare_id!("zK96WPaENqkNzFMSSwUWYrjmPLFTsHUL8sp3aKaYBTF");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
