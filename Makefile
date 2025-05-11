all:
	g++ -o main main.cpp Cloud_Util.cpp KubernetesCluster.cpp Pod.cpp Server.cpp Container.cpp Ressource.cpp

clean:
	rm -f main
