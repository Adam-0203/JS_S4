#include "Container.h"
#include <iomanip>
#include <sstream>
#include <string>

Container::Container(std::string id, std::string image, double cpu, double memory) : 
 Resource(id,cpu,memory), image_(image) {}

Container::~Container() {}

void Container::start() {active_ = true;}
void Container::stop() {active_ = false;}

std::string Container::getMetrics() const {
    std::ostringstream oss;
    oss << "[Container: " << std::left << std::setw(15) << id_ << " : " <<
           std::setw(15) << std::to_string(cpu_) << " , " <<
           std::setw(15) << std::to_string(memory_) << " , " <<
           std::setw(15) << image_ << " ].";
    return oss.str();
}

std::ostream& operator<<(std::ostream& os,const Container& C){
    os << "[Container:   " <<  C.id_ << " : " << C.cpu_ << " , " << C.memory_ << " , " << C.image_ << " ].";
    return os;
}

string Container::getId() const{
    return id_;
}

double Container::getCPU(){
    return cpu_;
}
double Container::getMEMORY(){
    return memory_;
}