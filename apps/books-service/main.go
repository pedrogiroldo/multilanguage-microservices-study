package main

import (
	"context"
	"log"
	"net"

	pb "multilanguage-microservices-study/books-service/proto/books"

	"google.golang.org/grpc"
)

type BookServiceServer struct {
	pb.UnimplementedBookServiceServer
}

func (s *BookServiceServer) GetBookById(ctx context.Context, req *pb.BookIdRequest) (*pb.Book, error) {
	return &pb.Book{
		Id:     req.Id,
		Name:   "Exemplo de Livro",
		UserId: 548144,
	}, nil
}

func (s *BookServiceServer) CreateBook(ctx context.Context, req *pb.CreateBookRequest) (*pb.Book, error) {
	return &pb.Book{
		Id:     1,
		Name:   req.Name,
		UserId: req.UserId,
	}, nil
}

func (s *BookServiceServer) UpdateBook(ctx context.Context, req *pb.UpdateBookRequest) (*pb.Book, error) {
	return &pb.Book{
		Id:   req.Id,
		Name: req.Name,
	}, nil
}

func (s *BookServiceServer) DeleteBook(ctx context.Context, req *pb.BookIdRequest) (*pb.DeleteBookResponse, error) {
	return &pb.DeleteBookResponse{Success: true}, nil
}

func (s *BookServiceServer) ListBooks(ctx context.Context, req *pb.ListBooksRequest) (*pb.ListBooksResponse, error) {
	return &pb.ListBooksResponse{
		Books: []*pb.Book{
			{Id: 1, Name: "Livro 1", UserId: 548144},
			{Id: 2, Name: "Livro 2", UserId: 548145},
		},
	}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":9090")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()
	pb.RegisterBookServiceServer(grpcServer, &BookServiceServer{})
	log.Println("gRPC server listening on :9090")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
