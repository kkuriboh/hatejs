use clap::{Args, Parser, Subcommand};

#[derive(Parser)]
pub struct AdminCli {
    #[clap(subcommand)]
    pub command_type: CommandType,
}

#[derive(Subcommand)]
pub enum CommandType {
    /// Add an user as a blog poster
    AddPoster(AddUserCommand),
}

#[derive(Args)]
pub struct AddUserCommand {
    /// GitHub id of the user you wanna turn into a poster
    pub user_id: String,
}
