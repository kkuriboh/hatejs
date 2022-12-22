use anyhow::Result;
use args::CommandType;
use clap::Parser;
use redis::AsyncCommands;

mod args;

#[tokio::main]
async fn main() -> Result<()> {
    let redis = redis::Client::open(env!("REDIS_URL"))?;
    let args = args::AdminCli::parse();

    match args.command_type {
        CommandType::AddPoster(user) => {
            redis
                .get_tokio_connection()
                .await?
                .sadd("GM", user.user_id)
                .await?;
        }
        CommandType::Rebuild => {
            reqwest::Client::new()
                .post(env!("BUILD_HOOK"))
                .send()
                .await?;
        }
    };
    Ok(())
}
