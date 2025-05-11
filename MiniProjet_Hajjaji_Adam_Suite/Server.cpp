#include <iostream>
#include <sstream>
#include <iomanip>
#include "Server.h"
#include "CloudExceptions.h"


Server::Server(std::string id, double cpu, double memory) 
: Resource(id, cpu, memory), available_cpu_(cpu), available_memory_(memory) {}


bool Server::allocate(double cpu, double memory){
    try{
        if (available_cpu_>= cpu && available_memory_>=memory && active_){
            available_cpu_ -= cpu;
            available_memory_ -= memory;
            return true;
        }
        throw AllocationException("not enough ressources or Cluster unactive: ");
    }
    catch(const AllocationException& e){
        std::cout << e.what() << std::endl;
        return false;
    }
}

void Server::start() {active_ = true;}
void Server::stop() {active_ = false;}

std::string Server::getMetrics() const{
    std::ostringstream oss;
    oss << "[Server: " << std::left << std::setw(10) << id_ << " : " <<
    std::setw(10) << std::to_string(cpu_) << " , " <<
    std::setw(10) << std::to_string(memory_) << " , " <<
    std::setw(10) << std::to_string(available_cpu_) << " , " <<
    std::setw(10) << std::to_string(available_memory_) <<
    " ].";
    return oss.str();
}

std::ostream& operator<<(std::ostream& os, const Server& s){
    os << s.getMetrics();
    return os;
}

double Server::getAvailableCpu(){
    return available_cpu_;
}
double Server::getAvailableMemory(){
    return available_memory_;
}
Server::~Server() {}