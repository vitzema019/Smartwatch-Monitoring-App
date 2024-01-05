# Smartwatch Monitoring App

## Overview

This project involves the development of a application for Samsung Gear S3 smartwatches. The app enables users to monitor various health metrics, including heart rate, atmospheric pressure, and light levels. Additionally, it provides features for data management, local storage, and remote data transmission.

## Features

### Heart Rate Monitoring

- **Start and Stop Measurement:** Users can initiate and terminate heart rate monitoring sessions.
- **Real-time Status Display:** A popup window displays the current status during monitoring.
- **Result Messages:** Upon successful completion or error during measurement, informative messages are shown to the user.
- **Last Value Display:** The last measured heart rate value is prominently displayed in the heart rate measurement menu.

### Atmospheric Pressure Measurement

- **Start Measurement:** Users can measure atmospheric pressure and view the real-time value.
- **Result Display:** The measured pressure is shown, and the value is also accessible in the atmospheric pressure measurement menu.

### Light Level Measurement

- **Start Measurement:** Users can measure light levels and view the real-time value.
- **Result Display:** The measured light level is shown, and the value is accessible in the light level measurement menu.

### Data Management

- **View Stored Data:** Users can access and view stored data from the various sensors.
- **Average Heart Rate Display:** The app calculates and displays the average heart rate from the stored data.
- **Last Recorded Values:** Users can view the last recorded atmospheric pressure and light level values.

### Data Transmission

- **Send Data to Remote Storage:** Users can send the collected data to a remote server via API.
- **Status Messages:** The app provides status messages indicating the success or failure of data transmission.

## Implementation

The application is developed using Tizen Studio, leveraging JavaScript and the TAU (Tizen Advanced UI) library for the user interface. Each sensor (heart rate, atmospheric pressure, light level) is implemented as a separate module with functions for initialization, starting measurement, processing data, and stopping measurement.

Local data storage utilizes the Tizen Watch's internal storage system, allowing efficient retrieval and management of measured data. For remote data transmission, a REST API has been implemented using ASP.NET Core, featuring a corresponding model and controller.

The project effectively addresses challenges related to sensor integration, local data storage, and remote data transmission. Rigorous testing has been conducted on both real devices and the Tizen Studio emulator to ensure a robust and functional application.

## Usage

To use the application, deploy it to your Samsung Gear S3 smartwatch using Tizen Studio. Ensure the watch is connected to a Wi-Fi network for remote data transmission functionalities.

**Note:** When using the emulator, be aware of potential issues related to processor types. Emulation may work seamlessly on Intel-based processors but may encounter challenges on AMD processors due to HAXM requirements.
