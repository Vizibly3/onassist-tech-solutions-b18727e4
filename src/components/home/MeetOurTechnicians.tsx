import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Clock, Shield } from "lucide-react";
import { techniciansData, Technician } from "@/utils/techniciansData";

function getRandomTechnicians(arr: Technician[], n: number) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const MeetOurTechnicians = () => {
  const technicians = getRandomTechnicians(techniciansData, 4);
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Technicians
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our certified professionals bring years of experience and expertise
            to solve your tech challenges. Each technician is vetted, trained,
            and committed to providing exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {technicians.map((tech) => (
            <Card
              key={tech.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="relative mb-4">
                    <img
                      src={tech.image}
                      alt={tech.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-500 text-white">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{tech.title}</p>

                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{tech.rating}</span>
                    <span className="text-xs text-gray-500">
                      ({tech.completedJobs} jobs)
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">
                      {tech.experience} Experience
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-600">
                      {tech.certifications.length} Certifications
                    </span>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {tech.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                      {tech.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{tech.specialties.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-onassist-primary mb-2">
                50+
              </div>
              <div className="text-sm text-gray-600">Certified Technicians</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                15K+
              </div>
              <div className="text-sm text-gray-600">Jobs Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTechnicians;
