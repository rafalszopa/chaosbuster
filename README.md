# Chaos Buster

## Build
TBD

## About project
Chaos Buster is Chrome extension for collecting, organising and tracking browser's bookmarks. It allows you to create list of links grouped into named folders which can contain another folders. Such a way of organising things can be considered as tree structure.

Base organisation unit in the application is **board**. Board is simply top level (non nested or root) folder acting as container for **lists**. Lists are simple data structure grouping links to web resources together. Both boad and list contain metadata such as name, description or color code to give user a framework to organise data in custom way.

Application presents data in two different views. **General view** shows all boards and related lists in simplified way. **Board view** shows selected board and all related data (including metadata). It allows user to easly edit and manipulate data.

## Features
* Base
    * Board management
    * Start page
    * Quick bookmark save
    * Light and dark modes
* Advanced
    * Session management
    * Import/Export
    * Synchronization between many devices
    * Customizable, widget-based start page
    * Data visualization

## Why another bookmark manager?
This Chrome bookmark manager is intended to harness information chaos. It is very hard and unconvinient to use default bookmark manager which basically presents very simple folder structure. This solution may be enough for relatively small number of bookmarks. However, it brings chaos back when there are hundreds of bookmarks. This might cause searching for given resource difficult. Besides that all logical divisions look similar thus it is not easy to keep track on all resources we find important. 

There are plenty of bookmark organizers available on Chrome Web Store. However none of them satisfy all following criteria: 
* free, 
* fast, 
* reliable, 
* nice looking.

## MVP (Minimal Viable Product)
MVP is very basic version of application containing minimal and absolutely cricial functionality that make it working and useful. All these functions in MVP version are simplified and will be improving in proceeding releases thus MVP is very first version of app delivered during the first release.

MVP features:
* Bookmark managing
* Start page
* Quick bookmark save
* Light and dark modes