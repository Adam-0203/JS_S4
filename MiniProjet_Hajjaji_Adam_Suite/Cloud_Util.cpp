#include "Cloud_Util.h"
#include <fstream>
#include "CloudExceptions.h"

void deployPods(KubernetesCluster& cluster, std::vector<std::unique_ptr<Pod>>& pods){
    for (auto& x : pods){
        try {
            cluster.deployPod(std::move(x));
        }
        catch(AllocationException& e){
            std::cout << "Error deploting the pod" <<  e.what() << std::endl;
        }
    }
    pods.clear();
}

void display(const KubernetesCluster& cluster) {
   cout << "displaying infos" << endl;
   cout << cluster << endl;
}

void saveClusterMetrics(const KubernetesCluster& cluster, const std::string& filename){
    std::ofstream out_file(filename);
    if (!out_file){
        throw FileException("Coudn't open the file");
    }
    out_file << cluster.getMetrics();
    out_file.close();
}


void forEachContainer(const KubernetesCluster& cluster, const std::function<void(const Container&)>& func) {
    for (const auto& pod : cluster.getPods()) {
        for (const auto& container : pod->getContainers()) {
            func(*container);
        }
    }
}

