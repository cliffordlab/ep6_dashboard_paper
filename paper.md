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

  - name: Hyeokhyen Kwon
    equal-contrib: false # (This is how you can denote equal contributions between multiple authors)
    affiliation: 2
  
  - name: Yash Kiarashi
    equal-contrib: trfalseue # (This is how you can denote equal contributions between multiple authors)
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

In smart hospitals, monitoring patients' activity is important as they are highly correlated with well-being and health status of individuals. Also, especially in the era of pandemic, automatically monitoring the social distancing in real-time is important to intervene for preventing disease contamination among immunocompromised populations. However, it is difficult to deploy such system as standard patient monitoring solutions are costly, manual intensive, or incapable of capturing detailed activities across wide spaces. Previous solutions are either based on motion sensors that can only detect the presence of a person in the room or based on surveillance cameras that needs a intallation process involving significant modification in infrastructures. In this work, we propose a novel and low-cost non-contact patient monitoring system and dashboard using edge computing platform that can track patients activities across very wide indoor space (18,000+ squeare feet), which information is visualized in highly interactinve dashboard in real-time that is intuitive to use for people without technical backgrounds. The proposed framework uses 38 Raspberry Pis attached with camera, microphone, Bluetooth, and humidity and temperature sensos, where Pis are installed all across the hospital floor to monitor the ambient condition and patient activities. The system preserves patients’ privacy by preprocessing the captured sensor data in real-time using Google Coral USB TPU to extract deidentified features before storing the data. The preprocessed sensor data are transferred to on-premise fog computing node, and our dashboard system visualizes the data captured from multi-modal sensors in each Pi in real-time so that staffs can quickly react and intervene when any undesired behaviors is observed. Our dashboard also lets users to monitor the health status of each Pis to react quickly for any of malfunctioning Pis. All Pis are connected to local network and power source through the ceiling of the existing infrastructure, so that proposed monitoring system can be installed easily to transform any ordinary indoor space into smart building. We expect our low cost and accessible dashboard and edge computing framework helps turning any health care institutes to a smart space to improve patient health.

# Statement of Need

<!---
Low-cost and non-contact patient monitoring system using edge computing platform enables longitudinal clinical studies in resource-limited settings. 
Patient monitoring systems need to capture both patient activities and ambient environmental conditions to understand patients’ conditions to provide appropriate interventions. In this work, we propose a low-cost indoor monitoring system that uses 3 edge computing systems connected to a fog server layer installed in a built-in environment that can capture multi-modal sensors, including audio, video, Bluetooth strength, temperature, and humidity at multiple locations simultaneously. The analyzed patients' activities and ambient conditions are visualized in a dashboard for clinical practitioners to refer for patient care. 
--->

For a distributed sensor network application like this, it becomes very important to ensure that all of the sensors are working reliably over the extended period of time. To ensure this, we developed a robust mechanism to check the health of each of the Raspberry Pi [@RaspberryPi] and sensors mounted to it. The results from this upstream system are sourced to the dashboard. We designed a dashboard that provides intuitive interface for any pratitioners without programming expert to use to understand patient activities capture from a distributed sensor framework using edge and cloud computing. This constrasts to conventional patient monitoring system that is based on multiple surveilance camera where staff needs to manually go through. The proposed system can i) communicate information efficiently, ii) display overall ambient condition and patient activity data in interpretable manner, and iii) show longitudinal trends and changes in sensor data.

# Background: Distributed Sensor System and Computing Architecture 

![Raspberry Pi attached with sensors. (A) Raspberry Pi v4, (B) Bluetooth sensor, (c) Temperature and humidity sensor, (d) Camera sensor, (3) Microphone, (e) Google Coral USB TPU](assets/Rpi_and_sensors.png){ width=50% }

![Location of (a) 38 cameras and (b) 29 microphones in the study site.](assets/installation.png)

The study space is installed with 38 Raspberry Pis [@RaspberryPi] having multiple sensors, as shown in Figure 1. It senses Bluetooth beacon [@Bluetooth] carried by patients, ambient temperature and humidity in the space [@TempHumid]. By additionally having camera [@Camera], microphone [@Respeaker], and Google Coral USB TPU [@Coral], each Pi can process patient activity information efficiently to extract movement and speech activity across the study site having area size over 18,000 square feet. Figure 2 shows overall installation of camera and microphone installation using 38 Pis in the study site. All 38 Pis have cameras, temperature and humidity sensor, Bluetooth, and Coral TPU installed. Out of 38 Pis, 29 Pis have microphones installed, which was sufficient to cover the sound events occuring in the study site.

![Overall computer network architectures.](assets/computing_environment_hori.png){ width=70% }

Overall computer network architecture is shown in Figure 3. multi-modal sensor data captured from 38 Raspberry Pis are processed on-device to preserve patient privacy and the processed data are transfered to the on-premise fog computing node in real-time. One day volume of data stored in the fog computing node, which is nightly synced to the cloud computing node for permanent data storage. The frontend dashboard, which we propose in this work, is hosted in the fog computing node to monitor preprocessed sensor data.

## Audio Pipeline Analysis

Conversational behavior is an important part of health analysis, as speech behavior reflects the mental state of the patients. For example, seniors experiencing cognitive impairment tends to socially isolate themselves that can lead to serious depressions [@zafar2021loneliness]. Thus, monitoring speech behavior is especially important in nursing homes or assisted living institutes.
In our sensor network, we collect ambient acoustic signals in a built-in environment through respeaker USB microphone arrays [@Respeak] placed on the ceiling. Since the microphone can capture the conversations of patients, we process raw acoustic signals to extract unidentified acoustic features on Pis without storing raw data, which are Melspectogram [@Melspectogram] and MFCC [@Melspectogram], to preserve patient privacy. Through these features, we perform speaker diarization [@Diarizaion] to identify the speech behavior of the patients. Through these, our system can measure conversation or ambient audio cues related to ongoing patients’ activities. 

## Visual Pipeline Analysis

As mentioned earlier, monitoring the detailed movements of patients throughout the day and the space is important for health implications. The camera is used to track the movements of the patients in the space. Specifically, we detect 2D poses of people captured in the scene by using a state-of-the-art 2D pose estimation method [@Pose2D] that runs on Raspberry Pi in real-time, which can preserve the privacy of patients. The detected 2D poses are projected to the corresponding location in the study space. 

## Bluetooth Pipeline Analysis

In the Bluetooth pipeline analysis, we gather the BLE signals from the BLE Beacons [@Bluetooth] carried by the participants through the Raspberry Pis placed in the ceiling. We only store the MAC address and the corresponding RSSI of the BLE Beacons, thus preserving participant privacy.
Custom real-time algorithms are provided to detect the position of individuals wearing Bluetooth beacons moving around a built environment. With the collected RSSI data, we perform RNSI-weighted, RSSI-based Trilateration [@Trilateration] to track the movements of patients in the study space. Since the patients are equipped with unique BLE Beacons, we can associate the patient’s location tracked with BLE and camera to identify the exact patient that is undergoing social interactions in the space. This feature is integrated with camera-based occupancy analysis to understand which specific patient is potentially exposed to health risks.

## Humidity and Temperature Monitoring

Having temperature and humidity in each partition of the health care facilities could provide us ambient condition the patient is situated [@temp_hum]. In this study, we used the DHT22 Temperature-Humidity sensor module [@TempHumid] in conjunction with an RPi to record the variation in temperature and humidity. The DHT22 sensor comprised a thermistor and a capacitive humidity sensor that measured the surrounding air to provide calibrated temperature and humidity values. The sampling frequency is 1Hz, the temperature range was −40 to 80 °C, and the humidity range was 0–100% RH. 

# Proposed Work: Interactive Dashboard for Monitoring Multi-modal Edge Computing System

![Architecture Diagram of Dashboard](assets/Architecture_Diagram.png)

To implement the dashboard system to monitor the health status of Pis and display the processed data, we have followed a scalable three-tier architecture using Flask [@Flask], as shown in Figure 4, as an application server hosted with Nginx [@Nginx] as a load balancer and reverse proxy. The frontend is designed with React [@React] for and served through Nginx as web server. We are using InfluxDB [@InfluxDB] as the database for storing the time series data generated by the edge devices. Redis [@Redis] is used as a key-value storage to interact with background python [@Python] processes, whose output is consumed on the dashboard. MySQL [@MySQL] database is used for storing the authentication and authorization of users.

The frontend `Dashboard` is a unified portal developed using python [@Python] packages and React [@React] framework to monitor indoor activities through audio, visual, and spatial tracking. It monitors the following activities from our sensor and computing framework:
1. Sensor Health
2. Audio
3. Visual
4. Indoor Temperature and Humidity

Each information can be monitored by selecting the left side bard in the proposed dashboard shown in Figure 5.

##  Monitoring Sensor Breakdown

![Sensor Network Monitoring (A) Schematic of study space defining the positions of Raspberry Pi with region monitored by them (B) Status of each Raspberry Pi with option to reboot them remotely (C) Status of Sensors connected to Raspberry Pi in Region 9 ](assets/EP6_Dashboard_Status_highlighted.png)

Figure 5 (A) represents the position of each Raspberry Pi on our built-in environment (18,000 square feet) schematic that was shown in Figure 2. If clicked on a particular region, it shows the status of sensors connected to that particular Raspberry Pi as shown in Figure 5 (C). Lastly, the table in Figure 5 (B) represents the list of all Raspberry Pi with their status and an option to reboot them remotely.  

## Audio Pipeline Analysis

![Audio Channels for a particular microphone array](assets/Audio_graph.png)

Multi-array microphone system connected to Pi has four channels representing four directional sound sources surrounding and the poposed dashboard system lets practitioners monitor the power of acoustic signal measured in decibel for each Pi by clicking the Microphone of interest, as shown in Figure 6, which gives clues about the sound event at each location in the study site.

![Audio Pipeline (A) Study space schematic with the position of microphone arrays (B) Slider to analyze the activity between two specified hours (C) Heatmap depicting the activity level in the study space](assets/EP6_Dashboard_Audio.png)

With the detected audio activity, we conduct acoustic occupancy analysis, which shows overall conversation activities among the patients in the built-in space. Figure 7 represents the image of Audio section on our dashboard. Figure 7 (A) shows the physical location of microphone arrays in the built-in environment. To monitor hourly occupancy, we plot the heatmap of occupancy based on the audio signals captured across our study space, as shown in Figure 7 (C). The slider in Figure 7 (B) can be used to change the particular time range for monitoring occupancy in the space.

## Visual Pipeline Analysis

![Location of individuals (red dots) within floor plan layout of the built environment](assets/EP6_occupancy.jpg){ width=50% }

The movements of patients are displayed in the dashboard, as shown in Figure 8.Dashboard also displays the processed patient’s location data in heatmap. Heatmap, as the name suggests, displays the occupancy in terms of heat signature to visualize the population distribution throughout the study site. Combined with the heatmap based on the acoustic signal mentioned above, we can tell if the social interactions among patients have led to engaging conversations or not. The dashboard also shows the camera location associated with Raspberry Pi identifier number to find which camera was capturing the patient’s data at a specific moment.

## Humidity and Temperature Monitoring

![Real-time monitoring of ambient temperature and humidity at a Raspberry Pi location. ](assets/temperature_page.png)

Figure 8 represents the temperature and humidity tab on the proposed dashboard. Similar to audio section, use can monitor the hourly occupancy, we plot the heatmap of temperature based on the received signal with 1Hz sampling frequency. An slider has been designed so the user can access the the desired time frame signal and heatmap. This feature can be used to monitor the relative temperature and humidity across the building. 

On the whole, the proposed dashboard system integrated into distributed sensor network, computing architecture, and data analysis pipeline provides functionality to effectively and automatically monitor large-scale and temporally dense sensor data by using few clicks to select Pis and sensors of interest for practitioner without technical backgrounds to interact with readily. The proposed system is expected to opportunistically transform any ordinary space into smart environment with low cost Raspberry Pis.

# Acknowledgements
This work is part of the Cognitive Empowerment Program, which is supported by a generous investment from the James M. Cox Foundation and Cox Enterprises, Inc., in support of Emory’s Brain Health Center and Georgia Institute of Technology.

# References


