---
title: 'Open-source System for Monitoring Distributed Multi-modal Sensor Activities in a Indoor Environment Using Edge and Fog Computing Framework'
tags:
  - Python
  - In-door monitoring
  - Fog Computing
  - Audio Analysis
  - Vision Analysis

authors:
  - name: Krishna MVS
    equal-contrib: true # (This is how you can denote equal contributions between multiple authors)
    affiliation: 1
  
  - name: Ratan Singh
    equal-contrib: true # (This is how you can denote equal contributions between multiple authors)
    affiliation: 1

  - name: Arjunsinh Nakum
    equal-contrib: true
    affiliation: 1

  - name: Robert Tweedy
    equal-contrib: false # (This is how you can denote equal contributions between multiple authors)
    affiliation: 2

  - name: Hyeokhyen Kwon
    equal-contrib: false # (This is how you can denote equal contributions between multiple authors)
    affiliation: 2
  
  - name: Yash Kiarashi
    equal-contrib: false # (This is how you can denote equal contributions between multiple authors)
    affiliation: 2

  - name: Pradyumna B. Suresha
    equal-contrib: false # (This is how you can denote equal contributions between multiple authors)
    affiliation: 1
  
  - name: Chaitra Hegde
    equal-contrib: false # (This is how you can denote equal contributions between multiple authors)
    affiliation: 1
  
  - name: Nicolas Shu
    equal-contrib: false # (This is how you can denote equal contributions between multiple authors)
    affiliation: 1
  
  - name: Gari D. Clifford
    corresponding: true # (This is how you can denote equal contributions between multiple authors)
    affiliation: 2 # (Multiple affiliations must be quoted)


affiliations:
 - name: Department of Electrical and Computer Engineering, Georgia Institute of Technology, USA
   index: 1
 - name: Department of Biomedical Informatics, Emory University, USA
   index: 2

date: 13 August 2017
bibliography: paper.bib

# Optional fields if submitting to a AAS journal too, see this blog post:
# https://blog.joss.theoj.org/2018/12/a-new-collaboration-with-aas-publishing
aas-doi: 10.3847/xxxxx <- update this with the DOI from AAS once you know it.
aas-journal: Astrophysical Journal <- The name of the AAS journal.
---

# Summary

In smart hospitals, monitoring patients' activity is critical as they are highly correlated with the well-being and health status of individuals. Moreover, it is crucial to automatically monitor social distance in real-time, especially during pandemics, to prevent disease contamination among immunocompromised populations. The problem arises, however, when standard patient monitoring solutions are expensive, manually intensive, or unable to capture detailed activities across large areas. There are currently two types of solutions: motion sensors that can only detect the presence of a person or surveillance cameras that require significant changes to infrastructure for installation. This study proposes a novel and low-cost non-contact patient monitoring system and dashboard based on edge computing technology. The system can track patients' activities across a large indoor area (18,000+ square feet). This information is displayed in an interactive dashboard in real-time that is easy to use even for people who aren't technically savvy. In our study site, we installed 38 Raspberry Pis attached with camera, microphone, Bluetooth, and humidity and temperature sensors. Those Pis are installed all across the hospital floor to monitor the ambient condition and patient activities. The system preserves patients’ privacy by preprocessing the captured sensor data in real time using Google Coral USB TPU to extract deidentified features before storing the data. In real-time, our dashboard system visualizes the data captured from multi-modal sensors in each Pi so that staff can react and intervene quickly when any undesired behavior is observed. Users can also monitor the health status of each Pi from our dashboard to react quickly to any malfunctions. The proposed monitoring system can easily be installed in any ordinary indoor space by connecting all Pis to the local network and power source through the ceiling of the existing infrastructure. Our dashboard and edge computing framework will help transform any health care institute into a smart space to improve patient care.

# Statement of Need

For a distributed sensor network application like this, it becomes very important to ensure that all of the sensors are working reliably over an extended period of time. In order to ensure this, we developed a robust mechanism to check the health of Raspberry Pis [@RaspberryPi] and their sensors. The results from this upstream system are displayed on an interactive dashboard, which we mainly propose in this work. A dashboard was designed that provides an intuitive interface for practitioners without programming experience to understand patient activities captured from a distributed sensor framework using edge and cloud computing. The proposed system can i) communicate information efficiently, ii) display overall ambient condition and patient activity data in an interpretable manner, and iii) show longitudinal trends and changes in sensor data.

# Background: Distributed Sensor System and Computing Architecture 

![Raspberry Pi attached with sensors. (A) Raspberry Pi v4, (B) Bluetooth sensor, (c) Temperature and humidity sensor, (d) Camera sensor, (3) Microphone, (e) Google Coral USB TPU](assets/Rpi_and_sensors.png){ width=50% }

![Location of (a) 38 cameras and (b) 29 microphones in the study site.](assets/installation.png)

The study space is installed with 38 Raspberry Pis [@RaspberryPi] having multiple sensors, as shown in Figure 1. It senses Bluetooth beacon [@Bluetooth] carried by patients, ambient temperature, and humidity in the space [@TempHumid]. With the addition of a camera [@Camera], microphone [@Respeaker], and Google Coral USB TPU [@Coral], each Pi is able to process patient activity information efficiently, allowing it to extract movement and speech activity across the study site with an area of over 18,000 square feet. Figure 2 shows the overall installation of  cameras and microphones using 38 Pis at the study site. All 38 Pis have cameras, temperature and humidity sensors, Bluetooth, and Coral TPU. Out of 38 Pis, a subset of 29 Pis have microphones installed, which was sufficient to cover the sound events occurring in the study site.

![Overall computer network architectures.](assets/computing_environment_hori.png){ width=70% }

Overall computer network architecture is shown in Figure 3. Multi-modal raw sensor data captured from 38 Raspberry Pis are processed on-device to preserve patient privacy and only the processed data are transferred to the on-premise fog computing node in real time. An entire day's worth of data is stored in the fog computing node, which is synced to the cloud computing node every night. The frontend dashboard, which we propose in this work, is hosted on the fog computing node to monitor preprocessed sensor data.

## Audio Pipeline Analysis

Conversational behavior is an important part of health analysis, as speech behavior reflects the mental state of patients. For example, seniors experiencing cognitive impairment tend to socially isolate themselves, which can lead to serious depression [@zafar2021loneliness]. In our sensor network, we collect ambient acoustic signals in a built-in environment through respeaker USB microphone arrays [@Respeak] placed on the ceiling. When the microphone detects conversation activities, we process raw acoustic signals to extract unidentified acoustic features on Pis, which are Melspectogram [@Melspectogram] and MFCC [@Melspectogram], to preserve patient privacy. Through these features, we perform speaker diarization [@Diarizaion] to analyze the speech behavior of patients. 

## Visual Pipeline Analysis

Monitoring patient movements throughout the day and space is crucial for health implications. We use 38 cameras to track the movements of patients across a large space. Specifically, we detect 2D poses of people captured in the scene by using a state-of-the-art 2D pose estimation method [@Pose2D] that runs on Raspberry Pi in real-time, which can preserve the privacy of patients. The detected 2D poses are projected at the corresponding location in the study space. Each patient's location is tracked over time using the multi-view, multi-person tracking algorithm [@li2010multiple] in order to understand how the patient uses space and moves.

## Bluetooth Pipeline Analysis

In the Bluetooth pipeline analysis, we gather the BLE signals from the BLE Beacons [@Bluetooth] carried by the participants through the Raspberry Pis placed on the ceiling. We only store the MAC address and the corresponding RSSI of the BLE beacons to preserve privacy. Custom real-time algorithms are provided to detect the position of individuals wearing Bluetooth beacons. With the collected RSSI data, we perform RNSI-weighted, RSSI-based Trilateration [@Trilateration] to track the movements of patients in the study space. Because the patients wear unique Bluetooth beacons, we can correlate the patient's location tracked by BLE with camera-based localization analysis to pinpoint the exact patient undergoing activities in the space. 

## Humidity and Temperature Monitoring

By having temperature and humidity recorded in each partition of healthcare facilities, we can determine the ambient conditions patients are exposed to [@temp_hum]. In this study, we used the DHT22 Temperature-Humidity sensor module [@TempHumid] in conjunction with an RPi to record the variation in temperature and humidity. The DHT22 sensor comprises a thermistor and a capacitive humidity sensor that measures the surrounding air to provide calibrated temperature and humidity values. The sampling frequency is 1Hz, the temperature range is −40 to 80 °C, and the humidity range is 0–100% RH.

# Proposed Work: Interactive Dashboard for Monitoring Multi-modal Edge Computing System

![Architecture Diagram of Dashboard](assets/Architecture_Diagram.png)

To implement the dashboard system to monitor the health status of Pis and display the processed data, we have followed a scalable three-tier architecture based on Flask [@Flask], as shown in Figure 4, as an application server hosted with Nginx [@Nginx] as a load balancer and reverse proxy. The frontend is designed with React [@React] and served through Nginx as a web server. We are using InfluxDB [@InfluxDB] as the database for storing the time series data generated by edge devices. Redis [@Redis] is used as key-value storage to interact with background Python [@Python] processes, whose output is consumed on the dashboard. MySQL [@MySQL] database is used for storing the authentication and authorization of users.
Therefore, the proposed frontend `Dashboard` is a unified portal developed using Python [@Python] packages and React [@React] framework to monitor indoor activities through audio, visual, and spatial tracking. It monitors the following activities from our sensor and computing framework:
1. Sensor Health
2. Audio
3. Visual
4. Indoor Temperature and Humidity
Each piece of information can be monitored by selecting the left side bard in the proposed dashboard shown in Figure 5.

##  Monitoring Sensor Breakdown

![Sensor Network Monitoring (A) Schematic of study space defining the positions of Raspberry Pi with region monitored by them (B) Status of each Raspberry Pi with option to reboot them remotely (C) Status of Sensors connected to Raspberry Pi in Region 9 ](assets/EP6_Dashboard_Status_highlighted.png)

Figure 5 (A) represents the position of each Raspberry Pi in our built-in environment (18,000 square feet) schematic that was shown in Figure 2. If clicked on a particular region, it displays the status of sensors connected to that particular Raspberry Pi as shown in Figure 5 (C). The table in Figure 5 (B) represents the list of all Raspberry Pi with their status and an option to reboot them remotely.

## Audio Pipeline Analysis

![Audio Channels for a particular microphone array](assets/Audio_graph.png)

Using a multi-array microphone system connected to Pi, practitioners can monitor the power of acoustic signals measured in decibels for each Pi by clicking on the microphone of interest, as shown in Figure 6, giving insights into each location's sound event. The dashboard system has four channels representing four directional sound sources surrounding the Pi.

![Audio Pipeline (A) Study space schematic with the position of microphone arrays (B) Slider to analyze the activity between two specified hours (C) Heatmap depicting the speech activity level in the study space](assets/EP6_Dashboard_Audio.png)

With the detected audio activity, we conduct an acoustic occupancy analysis, which shows overall conversation activities among the patients in the built-in space. Figure 7 represents the image of the Audio section on our dashboard. Figure 7 (A) shows the physical location of microphone arrays in the built-in environment. To monitor hourly occupancy, we plot the heatmap of occupancy based on the audio signals captured across our study space, as shown in Figure 7 (C). The slider in Figure 7 (B) can be used to change a specific time range of the day for monitoring occupancy in the space.

## Visual Pipeline Analysis

![Location of individuals (red dots) within floor plan layout of the built environment](assets/EP6_occupancy.jpg){ width=50% }

The movements of patients are displayed on the dashboard, as shown in Figure 8. The dashboard also displays the processed patient’s location data in a heatmap. Heatmap, as the name suggests, displays the occupancy in terms of heat signature to visualize the population distribution throughout the study site. Together with the acoustic signal, we can determine whether or not social interactions resulted in engaging conversations among patients. To determine which camera was capturing the patient's data at a particular moment, the dashboard also displays the camera location associated with the Raspberry Pi identifier number.

## Humidity and Temperature Monitoring

![Real-time monitoring of ambient temperature and humidity at a Raspberry Pi location. ](assets/temperature_page.png)

Figure 9 represents the temperature and humidity tab on the proposed dashboard. Similar to the audio section, users can monitor hourly occupancy. We plot the heatmap of temperature based on the received signal with a 1Hz sampling frequency. Users can adjust the time range for accessing heat signatures at the study site by adjusting a slider. This feature can be used to monitor the relative temperature and humidity across the building if any undesired event occurred at a particular time.

On the whole, the dashboard system, which is integrated with a distributed sensor network, computing architecture, and data analysis pipeline, provides the capability to monitor large-scale, time-intensive sensor data effectively and automatically. With a few clicks, practitioners without technical backgrounds can quickly select Pis and sensors of interest. It is expected that the proposed dashboard framework along with the Raspberry Pi-powered system can transform any ordinary space into a smart environment at a low cost.

# Acknowledgements

This work is part of the Cognitive Empowerment Program, which is supported by James M. Cox Foundation and Cox Enterprises, Inc., in support of Emory’s Brain Health Center and Georgia Institute of Technology.

# References

