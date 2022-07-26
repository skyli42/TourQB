use actix_cors::Cors;
use actix_web::{get, http, Result, web, App, HttpResponse, HttpServer, Responder};
use serde::Serialize;


#[derive(Serialize)]
struct MyRes {
    name: String
}


#[get("/")]
async fn index() -> Result<impl Responder>  {
    let obj = MyRes{
        name: String::from("AAAA")
    };
    Ok(web::Json(obj))
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let url = "localhost:2020";
    println!("Actix Web started on {}", url);

    HttpServer::new(move || {
        let cors = Cors::permissive();
            // Specify which addresses the server can be accessed from
            // .allowed_origin("localhost:3000")
            // .allowed_methods(vec!["GET"]);
            // .allowed_headers(vec![http::header::CONTENT_TYPE, http::header::ACCEPT]);
        App::new().wrap(cors).service(index)
    })
    .bind(url)?
    .run()
    .await
}