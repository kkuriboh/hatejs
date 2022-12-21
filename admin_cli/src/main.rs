use args::CommandType;
use clap::Parser;
use redis::{AsyncCommands, RedisResult};

mod args;

#[tokio::main]
async fn main() -> RedisResult<()> {
    let redis = redis::Client::open(env!("REDIS_URL"))?;
    let args = args::AdminCli::parse();

    match args.command_type {
        CommandType::AddPoster(user) => {
            redis
                .get_tokio_connection()
                .await?
                .sadd("GM", user.user_id)
                .await?
        }
    };
    Ok(())
}
