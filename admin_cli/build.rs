fn main() {
    dotenv_build::output(dotenv_build::Config {
        filename: std::path::Path::new(".env"),
        recursive_search: false,
        fail_if_missing_dotenv: false,
    })
    .unwrap();
}
