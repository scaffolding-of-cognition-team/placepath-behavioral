function generateProtocol(child, pastSessions) {
    // -------- Helper functions ----------------------------------------------

    // See http://stackoverflow.com/a/12646864
    // Returns a new array with elements of the array in random order.
    function shuffle(array) {
        var shuffled = Ember.$.extend(true, [], array); // deep copy array
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    // Returns a random element of an array, and removes that element from the array
    function pop_random(array) {
        if (array.length) {
            let randIndex = Math.floor(Math.random() * array.length);
            return array.splice(randIndex, 1)[0];
        }
        return null;
    }

    // -------- End helper functions -------------------------------------------

    /* Assign condition randomly as fallback/initial value. This will be true/false with equal probability. */

    // Choose either 1 or 2 in order to counterbalance across participants
    let condition = Math.floor(Math.random() * 2) + 1;

    var fam_trial_num = 10;
    var test_trial_num = 4;
    var image_duration = 3.5; // 3.5 seconds
    var image_duration_max = 3.325; // 95% of 3.5 seconds 
    var path_duration = 24; // 24 seconds
    var path_duration_max = 22.8; // 95% of 24 seconds 
    var test_trial_index = 54; // the test phase starts at the 54th frame

    // Path conditions
    let fam_paths = [
        'PathXA-Orientation' + condition,
        'PathXB-Orientation' + condition,
    ];

    // Image conditions 
    let fam_images = [
        'ImageA-Orientation' + condition,
        'ImageB-Orientation' + condition,
    ];

    // Test conditions 
    let test_paths = [
        'PathXA-Orientation1-Test',
        'PathXB-Orientation1-Test',
        'PathXA-Orientation2-Test',
        'PathXB-Orientation2-Test',
    ]

    // Loop through a trial pair in which we show one image and one path from the fam set
    let fam_trials = [];
    for (let i = 0; i < fam_trial_num; i++) {

        // Randomize fam_paths order and take each element
        let fam_path_order = shuffle(fam_paths);
        let fam_image_order = shuffle(fam_images);

        // Push the first element of the shuffled array
        fam_trials.push(fam_image_order[0]);
        fam_trials.push(fam_path_order[0]);

        // Push the second element of the shuffled array
        fam_trials.push(fam_image_order[1]);
        fam_trials.push(fam_path_order[1]);
    }

    // Randomize the order of the test trials
    let test_trials = shuffle(test_paths);

    // Define frames
    let frames = {
        "video-config": {
            "kind": "exp-video-config",
            "troubleshootingIntro": "If you are having trouble getting this experiment set up, please feel free to contact Mar Lacsamana or Emily Chen by email at <b>soc-participate@stanford.edu</b>, and we would be happy to help you out!"
        },
        "video-consent": {
            "kind": "exp-lookit-video-consent",
            "template": "consent_005",
            "PIName": "Dr. Cameron Ellis, PhD",
            "institution": "Stanford University",
            "PIContact": "Dr. Cameron Ellis at (650) 308-6130",
            "purpose": "Your child is invited to participate in a research study on baby cognition. The aim of this research is to investigate how babies see, learn, remember, and pay attention.",
            "procedures": "With your permission, your child’s face and gaze will be video recorded while they are presented with a variety of stimuli. We are interested in which stimuli your child engages with for longer periods of time. We will ask you (the parent) to turn away from the screen to avoid influencing your child’s responses.",
            "risk_statement": "The risks associated with this study are minimal. Standard computer displays will be used, involving child-friendly images and videos. If you or your child experience any discomfort, you may end the session with no penalty. The data collected will be stored securely, in compliance with Stanford University standards, minimizing the risk of a confidentiality breach. There are no anticipated risks associated with participating.",
            "voluntary_participation": "",
            "payment": "As a token of appreciation for your child’s participation, we will send you a digital code to a $10 e-gift card. To be eligible, your child must fall within the age range, you will need to submit a valid consent statement, and your child’s face must be visible during the consent process. After you have finished the study, we will message you with a digital code to the e-gift card within a week. We will still send you an e-gift card in the event you and your child cannot finish the study or you choose to withdraw at any time. We cannot and do not guarantee or promise that you and your child will receive any benefits from this study.",
            "datause": "",
            "include_databrary": true,
            "additional_video_privacy_statement": "",
            "gdpr": false,
            "research_rights_statement": "If you have read this form and have decided to allow your child to participate in this project, please understand your child’s participation is voluntary and as their parent or legal guardian, you have the right to withdraw consent or discontinue participation at any time without penalty or loss of benefits to which they are otherwise entitled. The alternative is not to participate. You and your child have the right to refuse to answer particular questions.Your child’s face will be video recorded so we can track their eye movements offline for our research. The results of this research study may be presented at scientific or professional meetings or published in scientific journals.  Your child’s individual privacy will be maintained in all published and written data resulting from the study. \n\n Identifiers will be removed from identifiable private information and, after such removal, the information could be used for future research studies or distributed to another investigator for future research studies without additional informed consent from you.",
            "additional_segments": [{
                "title": "How long we will store your data",
                "text": "Once the study has concluded, our research team at Stanford University will retain the data collected from you for 5 years, after which we will delete and remove any data from our servers. Lookit stores data indefinitely unless you withdraw your recordings at the end of the study."
            }]
        },
        "instructions-1": {
            "kind": "exp-lookit-text",
            "showPreviousButton": false,
            "blocks": [{
                    "emph": true,
                    "title": "Welcome!",
                    "text": "Thank you for taking the time to participate in our study!"
                }, {
                    "text": "This study will take at most 30 minutes of your time, including set up and debrief. Your child needs to be present for at most 12 minutes."
                },
                //{ "text": "During the actual study, your child will watch videos that show movement through a virtual home environment. We are interested in knowing where they look because where babies look can tell us something about what they understand about the video." }, 
                {
                    "text": "\n<u>Here are our estimates for how long each part of this study will take:</u>"
                },
                {
                    "listblocks": [{
                        "text": "Consent (happening now) <b>[1 minute]</b> - your child <i>must</i> be present when you record the consent video"
                    }, {
                        "text": "Introduction and setup <b>[5 minutes]</b> - your child does <i>not</i> need to be present"
                    }, {
                        "text": "Experiment <b>[6-12 minutes]</b> - your child <i>must</i> be present"
                    }, {
                        "text": "Debrief <b>[5 minutes]</b> - your child does <i>not</i> need to be present"
                    }]
                }
            ]
        },
        "instructions-2": {
            "kind": "exp-lookit-instructions",
            "nextButtonText": "Next",
            "blocks": [{
                "title": "Check audio!"
            }, {
                "text": "Let's make sure your computer audio is working. Please turn up the volume on your computer so that it is easy to hear sounds while still being at a comfortable level.",
                "mediaBlock": {
                    "text": "You should hear 'Ready to go!'",
                    "isVideo": false,
                    "mustPlay": true,
                    "warningText": "Please try playing the sample audio. Make sure you can hear the words clearly!",
                    "sources": [{
                        "src": "https://s3.amazonaws.com/lookitcontents/exp-physics-final/audio/ready.mp3",
                        "type": "audio/mp3"
                    }, {
                        "src": "https://s3.amazonaws.com/lookitcontents/exp-physics-final/audio/ready.ogg",
                        "type": "audio/ogg"
                    }]
                }
            }]
        },
        "instructions-3": {
            "kind": "exp-lookit-instruction-video",
            "displayFullscreenOverride": true,
            "instructionsVideo": [{
                "src": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/mp4/lookit_instructions_v2.mp4",
                "type": "video/mp4",
            }],
            "introText": "<b><u>At this point, your child does not have to be here</u></b>. Feel free to occupy them for the next few minutes. \n\n Please watch this video for an overview of what will happen during the study. \n(You can read the transcript to the right if you prefer.)",
            "transcriptTitle": "Video Transcript",
            "transcriptBlocks": [{
                    "text": "At the beginning of the experiment, your child will see a video of an exciting rotating star. We call this video the attention getter because we use it to get your child’s attention."
                },
                {
                    "text": "Then we will show your child a video, which we call the “experiment video.” When your child is watching one of these videos, we will measure how long your child wants to look at the video."
                },
                {
                    "text": "These experiment videos start by showing a picture of either a face or an object. This part is four seconds long. Next, we show a video that starts in this room and then walks into either this room or this room. This part is 24 seconds long."
                },
                {
                    "text": "We will repeat these experiment videos until your child looks away for five (5) seconds in a row, and we will give you more instructions after this video on how to indicate when your child has looked away."
                },
                {
                    "text": "Together, the attention getter video and the repeating experiment videos can take up to 10 minutes. We call this time the “learning phase.” After 10 minutes, the learning phase will end and the videos will stop automatically."
                }, {
                    "text": "Please note that while the attention getter has sound, the experiment videos do not have any sound."
                }, {
                    "text": "The next part of the study is called the “test phase.” This part will look very similar to the learning phase, except that you won’t have to check if your child is looking at the screen. During this part, we will show your child four videos: two that your child has seen and two that your child has not seen. We will measure how interested your child is in looking at these two types of videos. This part will take 2 minutes."
                },
                {
                    "text": "At any time during the study, you can pause the video or stop the study early by pressing the escape key. If you do so, you will see this box in the top right hand corner. You can press the “Continue” key if you think your child would like to continue the study. You can press the “Exit” key if you or your child wants to stop the study early."
                }
            ],
            "displayFullscreen": false,
            "warningText": "Please watch the video or read the summary before proceeding.",
            "nextButtonText": "Next",
            "title": "Study Introduction",
            "showPreviousButton": false,
            "requireWatchOrRead": true
        },
        "instructions-4": {
            "kind": "exp-lookit-instructions",
            "displayFullscreenOverride": true,
            "restartAfterPause": true,
            "blocks": [{
                "title": "Instructions for Caregiver Involvement",
                "listblocks": [{
                    "text": "As we mentioned in the video that you just watched, we are going to ask you to help us determine when your child has finished looking at our videos during the learning phase."
                }, {
                    "text": "To do that, we ask that when your child has looked away from the computer screen, start counting slowly, and <b>if your child is still looking away after five (5) seconds, please press the SPACE bar</b>. If your child looks back to the screen before you have finished counting to five (5) seconds, you can stop counting and start again once they look away. You can count time using '1-Mississippi, 2-Mississippi' etc."
                }, {
                    "text": "Let's see how that looks in practice! On the next page, you will see a video of a child watching a video. Occasionally, the child will look away from the screen. However, you will see that the parent presses the space bar <b>only</b> after the child has looked away for five (5) seconds in a row."
                }]
            }],
            "nextButtonText": "Show me the example!"
        },
        "instructions-5": {
            "kind": "exp-lookit-video",
            "displayFullscreenOverride": true,
            "endTrialKey": " ",
            "pauseKey": "p",
            "pausedText": "Study paused! \n\n Press 'p' to resume.",
            "audio": {
                "loop": false,
                "source": "peekaboo"
            },
            "video": {
                "position": "fill",
                "source": "parent_control_practice_front"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "parentTextBlock": {
                "text": "The parent will stop the video after their child has turned their head away from the computer for five (5) seconds in a row. Notice that the parent isn't stopping the trial for short looks away!"
            },
            "requiredDuration": 0,
            "requireAudioCount": 0,
            "requireVideoCount": 1,
            "restartAfterPause": true,
            "pauseVideo": "attentiongrabber",
            "doRecording": false,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": ["mp3"],
            "videoTypes": ["mp4"]
        },
        "instructions-6": {
            "kind": "exp-lookit-video-infant-control",
            "displayFullscreenOverride": true,
            "endTrialKey": " ",
            "pauseKey": "p",
            "pausedText": "Study paused! \n\n Press 'p' to resume.",
            "audio": {
                "loop": false,
                "source": "peekaboo"
            },
            "video": {
                "position": "fill",
                "source": "parent_control_practice_back"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "parentTextBlock": {
                "text": "Now let's practice stopping the video yourself! This viewpoint is the same as the one you will have of your child during the study. <b>Watch this video and press the spacebar when the child has looked away for five (5) seconds in a row.</b>"
            },
            "requiredDuration": 0,
            "requireAudioCount": 0,
            "requireVideoCount": 1,
            "restartAfterPause": true,
            "pauseVideo": "attentiongrabber",
            "doRecording": false,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": ["mp3"],
            "videoTypes": ["mp4"]
        },
        "instructions-7": {
            "kind": "exp-lookit-instructions",
            "displayFullscreenOverride": true,
            "blocks": [{
                "title": "Great job!",
                "listblocks": [{
                    "text": "We hope that practice round helped you learn when to stop the videos during the study. During the study, don't worry if you think you've made a mistake."
                }, {
                    "text": "<u><b>TIP:</b></u> You can start counting when they turn their head away from the screen. You don't need to peek over their shoulder to see where they are looking, as that might distract their attention away from the screen."
                }]
            }, {
                "text": "Now that you know what to do, let's get set up!"
            }],
            "nextButtonText": "Continue with setup!"
        },
        "instructions-8": {
            "kind": "exp-lookit-instructions",
            "displayFullscreenOverride": true,
            "blocks": [{
                "text": "If possible, complete the study in a quiet room, away from windows, open doorways, toys, pets, siblings, etc. In other words, we want to minimize interesting things that your child may want to look at that are not our videos. For example, a home office is better than a busy kitchen. However, we understand that a quiet environment is not always possible!\n\n",
                "image": {
                    "alt": "No distractions",
                    "src": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/blob/main/img/distractions.png?raw=true",
                    "title": "Setting up the video"
                }
            }, {
                "text": "\n\n Please make sure your webcam is centered on the screen (this should be the case for most laptops). \n\n",
                "image": {
                    "alt": "Center camera",
                    "src": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/blob/main/img/centering.png?raw=true"
                }
            }, {
                "text": "\n\n If you are using two monitors, please turn one of them off. Make sure that the camera you are using is attached to the same screen that your child is looking at. \n\n ",
                "image": {
                    "alt": "Turn off monitor",
                    "src": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/blob/main/img/monitors.png?raw=true"
                }
            }],
            "nextButtonText": "Next"
        },
        "instructions-9": {
            "kind": "exp-lookit-instructions",
            "displayFullscreenOverride": true,
            "blocks": [{
                    "title": "Some final instructions:",
                    "text": "During the study, you can set your child up in a high chair and stand or sit behind them. You can also sit in front of the computer with your child on your lap if you think they would prefer that arrangement. During the study, try to keep your child's body oriented towards the screen so they can look at it if they want to."
                },
                {
                    "text": "<u>As a reminder:</u>"
                },
                {
                    "listblocks": [{
                        "text": "<b>Don’t worry if your child isn’t looking at the screen the entire time!</b> There's no need to direct your child's attention towards the screen, or interact with them during the study, since we want to know what decisions your child makes on their own."
                    }, {
                        "text": "Please avoid peeking over your child's shoulder to check their gaze, narrating the experiment, or pointing at the screen."
                    }]
                }
            ],
            "nextButtonText": "Next"
        },
        "instructions-10": {
            "kind": "exp-lookit-instructions",
            "displayFullscreenOverride": true,
            "blocks": [{
                    "title": "Time to get your child set up!",
                    "listblocks": [{
                        "text": "At this point, you can go get your child and set them up in a high chair or on your lap."
                    }, {
                        "text": "Please put the laptop or computer close to your child, but far enough away that they cannot reach forward and touch the keyboard."
                    }, {
                        "text": "On the next page, you will be able to check the webcam view. Please make sure that the webcam has a full view of your child's face and their eyes. <b>Before you start the study, try to make sure that your face is not present in the camera.</b>"
                    }, {
                        "text": "<u>NOTE:</u> If you need to pause or end the study early, press the 'esc' key. You can exit the study early by selecting the 'exit' option at the top right corner, which will then fast forward you to the end of the experiment. Please pause the study only in rare cases, such as your child becomes too fussy to continue or someone comes in and distracts your child."
                    }],
                },
                {
                    "title": "Ready?",
                    "emph": true,
                    "text": "If your child is set up, go ahead and press the 'Check video!' button."
                }
            ],
            "nextButtonText": "Check video!"
        },
        "midpoint-message": {
            "kind": "exp-lookit-instructions",
            "displayFullscreenOverride": true,
            "blocks": [{
                "title": "Your child finished the learning phase!",
                "text": "We will now show them four test videos totaling two (2) minutes in duration. During this phase, you will <i>not</i> have to keep track of when your child is looking at the screen. You will also not be able to pause the study, so if your child becomes too fussy to continue, please feel free to end the study early by pressing the 'esc' key. \n\n Please press 'Continue' to proceed."
            }],
            "nextButtonText": "Continue",
            "showPreviousButton": false
        },
        "start-recording-with-image": {
            "kind": "exp-lookit-start-recording",
            "baseDir": "https://www.mit.edu/~kimscott/placeholderstimuli/",
            "videoTypes": ["webm", "mp4"],
            "image": "peekaboo_remy.jpg",
            "imageAnimation": "spin",
            "displayFullscreen": true
        },
        "stop-recording-with-image": {
            "kind": "exp-lookit-stop-recording",
            "baseDir": "https://www.mit.edu/~kimscott/placeholderstimuli/",
            "videoTypes": ["webm", "mp4"],
            "image": "peekaboo_remy.jpg",
            "imageAnimation": "spin",
            "displayFullscreenOverride": true,
        },
        "webcam-display-check": {
            "kind": "exp-lookit-webcam-display",
            "nextButtonText": "Start the experiment!",
            "showPreviousButton": false,
            "displayFullscreenOverride": true,
            "startRecordingAutomatically": false,
            "blocks": [{
                "title": "Last check: Does the video look good? Are your child's eyes visible?",
                "listblocks": [{
                    "text": "If so, you can go ahead and start the experiment! The experiment will start once you press the 'Start the experiment!' button."
                }]
            }]
        },
        "attention-getter": {
            "kind": "exp-lookit-video",
            "pausedText": "Study paused! \n\n Press 'p' to resume.",
            "pauseKey": "p",
            "restartAfterPause": true,
            "video": {
                "loop": false,
                "position": "fill",
                "source": "attention_getter"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": 0,
            "requireAudioCount": 0,
            "requireVideoCount": 1,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": ["mp3"],
            "videoTypes": ["mp4"]
        },
        "ImageA-Orientation1": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": " ",
            "pauseKey": "p",
            "pausedText": "Study paused \n\n Press 'p' to resume",
            "restartAfterPause": true,
            "video": {
                "loop": false,
                "position": "fill",
                "source": "ImageA_Orientation1"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": image_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ],
            "selectNextFrame": "function(frames, frameIndex, frameData, expData, sequence, child, pastSessions) {console.log(frameData), console.log(expData); current = frameData.totalLookingTime; if (current < " + image_duration_max + ") {nextFrame = " + test_trial_index + "} else {nextFrame = frameIndex + 1} return (nextFrame)}"
        },
        "ImageB-Orientation1": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": " ",
            "pauseKey": "p",
            "pausedText": "Study paused \n\n Press 'p' to resume",
            "restartAfterPause": true,
            "video": {
                "loop": false,
                "position": "fill",
                "source": "ImageB_Orientation1"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": image_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ],
            "selectNextFrame": "function(frames, frameIndex, frameData, expData, sequence, child, pastSessions) {console.log(frameData), console.log(expData); current = frameData.totalLookingTime; if (current < " + image_duration_max + ") {nextFrame = " + test_trial_index + "} else {nextFrame = frameIndex + 1} return (nextFrame)}"
        },
        "ImageA-Orientation2": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": " ",
            "pauseKey": "p",
            "pausedText": "Study paused \n\n Press 'p' to resume",
            "restartAfterPause": true,
            "video": {
                "loop": false,
                "position": "fill",
                "source": "ImageA_Orientation2"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": image_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ],
            "selectNextFrame": "function(frames, frameIndex, frameData, expData, sequence, child, pastSessions) {console.log(frameData), console.log(expData); current = frameData.totalLookingTime; if (current < " + image_duration_max + ") {nextFrame = " + test_trial_index + "} else {nextFrame = frameIndex + 1} return (nextFrame)}"
        },
        "ImageB-Orientation2": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": " ",
            "pauseKey": "p",
            "pausedText": "Study paused \n\n Press 'p' to resume",
            "restartAfterPause": true,
            "video": {
                "loop": false,
                "position": "fill",
                "source": "ImageB_Orientation2"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": image_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ],
            "selectNextFrame": "function(frames, frameIndex, frameData, expData, sequence, child, pastSessions) {console.log(frameData), console.log(expData); current = frameData.totalLookingTime; if (current < " + image_duration_max + ") {nextFrame = " + test_trial_index + "} else {nextFrame = frameIndex + 1} return (nextFrame)}"
        },
        "PathXA-Orientation1": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": " ",
            "pauseKey": "p",
            "pausedText": "Study paused \n\n Press 'p' to resume",
            "restartAfterPause": true,
            "video": {
                "loop": false,
                "position": "fill",
                "source": "PathXA_Orientation1"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": path_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ],
            "selectNextFrame": "function(frames, frameIndex, frameData, expData, sequence, child, pastSessions) {console.log(frameData), console.log(expData); current = frameData.totalLookingTime; if (current < " + path_duration_max + ") {nextFrame = " + test_trial_index + "} else {nextFrame = frameIndex + 1} return (nextFrame)}"
        },
        "PathXB-Orientation1": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": " ",
            "pauseKey": "p",
            "pausedText": "Study paused \n\n Press 'p' to resume",
            "restartAfterPause": true,
            "video": {
                "loop": false,
                "position": "fill",
                "source": "PathXB_Orientation1"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": path_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ],
            "selectNextFrame": "function(frames, frameIndex, frameData, expData, sequence, child, pastSessions) {console.log(frameData), console.log(expData); current = frameData.totalLookingTime; if (current < " + path_duration_max + ") {nextFrame = " + test_trial_index + "} else {nextFrame = frameIndex + 1} return (nextFrame)}"
        },
        "PathXA-Orientation2": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": " ",
            "pauseKey": "p",
            "pausedText": "Study paused \n\n Press 'p' to resume",
            "restartAfterPause": true,
            "video": {
                "loop": false,
                "position": "fill",
                "source": "PathXA_Orientation2"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": path_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ],
            "selectNextFrame": "function(frames, frameIndex, frameData, expData, sequence, child, pastSessions) {console.log(frameData), console.log(expData); current = frameData.totalLookingTime; if (current < " + path_duration_max + ") {nextFrame = " + test_trial_index + "} else {nextFrame = frameIndex + 1} return (nextFrame)}"
        },
        "PathXB-Orientation2": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": " ",
            "pauseKey": "p",
            "pausedText": "Study paused \n\n Press 'p' to resume",
            "restartAfterPause": true,
            "video": {
                "loop": false,
                "position": "fill",
                "source": "PathXB_Orientation2"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": path_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ],
            "selectNextFrame": "function(frames, frameIndex, frameData, expData, sequence, child, pastSessions) {console.log(frameData), console.log(expData); current = frameData.totalLookingTime; if (current < " + path_duration_max + ") {nextFrame = " + test_trial_index + "} else {nextFrame = frameIndex + 1} return (nextFrame)}"
        },
        "PathXA-Orientation1-Test": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": "",
            "pauseKey": "",
            "video": {
                "loop": false,
                "position": "fill",
                "source": "PathXA_Orientation1"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": path_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ]
        },
        "PathXB-Orientation1-Test": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": "",
            "pauseKey": "",
            "video": {
                "loop": false,
                "position": "fill",
                "source": "PathXB_Orientation1"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": path_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ]
        },
        "PathXA-Orientation2-Test": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": "",
            "pauseKey": "",
            "video": {
                "loop": false,
                "position": "fill",
                "source": "PathXA_Orientation2"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": path_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ]
        },
        "PathXB-Orientation2-Test": {
            "kind": "exp-lookit-video-infant-control",
            "endTrialKey": "",
            "pauseKey": "",
            "video": {
                "loop": false,
                "position": "fill",
                "source": "PathXB_Orientation2"
            },
            "backgroundColor": "white",
            "autoProceed": true,
            "requiredDuration": path_duration,
            "requireVideoCount": 0,
            "doRecording": true,
            "showWaitForRecordingMessage": false,
            "showWaitForUploadMessage": false,
            "frameOffsetAfterPause": 0,
            "baseDir": "https://github.com/scaffolding-of-cognition-team/placepath-behavioral/raw/main/",
            "audioTypes": [
                "mp3"
            ],
            "videoTypes": [
                "mp4"
            ]
        },
        "study-outro": {
            "kind": "exp-lookit-text",
            "displayFullscreenOverride": true,
            "blocks": [{
                "emph": true,
                "title": "You and your child have completed the experiment! Awesome job!"
            }, {
                "text": "To wrap up, we will ask you a few questions that will take at most 5 minutes more. \n\n<b>At this point, your child has completed the study and does not need to be present.</b> Feel free to occupy them now before we wrap up."
            }],
            "showPreviousButton": false,
            "nextButtonText": "Next"
        },
        "feedback": {
            "kind": "exp-lookit-survey",
            "displayFullscreenOverride": true,
            "formSchema": {
                "schema": {
                    "type": "object",
                    "title": "Wrap-up Questions",
                    "properties": {
                        "email": {
                            "title": "Please provide your email so we can send your $10 Tango Gift Card. Your email will be exclusively utilized for the purpose of delivering your compensation.",
                            "type": "string",
                            "format": "email"
                        },
                        "instructions-feedback": {
                            "title": "How clear were the instructions when setting up for the study?",
                            "type": "string",
                            "enum": [
                                "1 - Not clear at all",
                                "2 - Somewhat unclear",
                                "3 - Neither clear nor unclear",
                                "4 - Somewhat clear",
                                "5 - Extremely clear"
                            ]
                        },
                        "video-feedback": {
                            "title": "Did you notice any of the following issues with the study while your child was participating?",
                            "type": "array",
                            "items": {
                                "type": "string",
                                "enum": [
                                    "The videos buffered or didn't play smoothly",
                                    "The videos took a long time to load"
                                ]
                            },
                            "uniqueItems": true
                        },
                        "miscellaneous-feedback": {
                            "title": "Is there any other feedback that you would like to share about your experience with this study?",
                            "type": "string"
                        }
                    },
                    "required": ["email"]
                },
                "options": {
                    "fields": {
                        "instructions-feedback": {
                            "type": "radio",
                            "optionLabels": [
                                "1 - Not clear at all",
                                "2 - Somewhat unclear",
                                "3 - Neither clear nor unclear",
                                "4 - Somewhat clear",
                                "5 - Extremely clear"
                            ],
                            "hideNone": true
                        },
                        "video-feedback": {
                            "type": "checkbox",
                            "optionLabels": [
                                "The videos buffered or didn't play smoothly",
                                "The videos took a long time to load"
                            ]
                        }
                    }
                }
            },
            "nextButtonText": "Next"
        },
        "study-debrief": {
            "kind": "exp-lookit-exit-survey",
            "displayFullscreenOverride": true,
            "doUseCamera": false,
            "showDatabraryOptions": true,
            "includeWithdrawalExample": true,
            "debriefing": {
                "title": "Thank you!",
                "emph": true,
                "text": "Here is some more information about the study you and your child just participated in. Feel free to skip this part if you want.",
                "blocks": [{
                    "text": "This was a preliminary study on how infants learn about their environment during navigation. They watched videos that moved through an environment from a first-person perspective, as if they were being carried through the space."
                }, 
                /*{
                    "text": "There were two types of videos: one video turned left towards one room and the other video turned right to the other room."
                }, {
                    "text": "First, your child saw an 'attention-getter' (the rotating star), which we use to make sure that all children are paying attention to the screen at the start of the experiment."
                }, {
                    "text": "Next, your child saw what we call 'familiarization' videos, which we showed to teach your child the environment. This part of the experiment was the learning phase. We really appreciate your help running this part of the study!"
                }, */
                {
                    "text": "At the end of the learning phase, your child saw four (4) 'test' videos, which are the videos that we will use to measure your child's interest. The test videos are situations that were either familiar or novel. A familiar situation showed a route through the environment that they saw during the learning phase. A novel situation showed a route through the environment that they had not seen before. We are interested in measuring your child's gaze as a way to determine if, on average, infants have learned which path leads to which room."
                }, {
                    "text": "If babies have learned something about the environment we showed them, then they should be surprised when we show them a novel (i.e., incongruent) path. For example, if they learned that a right turn leads to the room with the painting of an object, they might be surprised if we suddenly show them a route that takes a right turn and ends up in the room with the painting of a face. We measure this 'surprise' by recording the amount of time your child looked on the screen. On average, if the children in this study look longer at a novel route, we infer that they might have learned something about the environment that we showed them. We hope that this study will help us better understand the origins of how we learn to navigate through our environments."
                }]
            },
        },
    };

    // define list to hold all trial frames 
    let all_trials = [];

    // add starting attention-getter
    all_trials.push('attention-getter');

    // add familiarization trials 
    for (let i = 0; i < fam_trials.length; i++) {
        all_trials.push(fam_trials[i]);
    }

    // attention-getter between familiarization and test
    all_trials.push('midpoint-message');
    all_trials.push('attention-getter');

    // add test trials 
    for (let i = 0; i < test_trials.length; i++) {
        all_trials.push(test_trials[i]);
    }

    /* Construct the sequence */
    let frame_sequence = [
        "instructions-1",
        "video-config",
        "video-consent",
        // "instructions-2",
        "instructions-3",
        "instructions-4",
        "instructions-5",
        "instructions-6",
        "instructions-7",
        "instructions-8",
        "instructions-9",
        "instructions-10",
        "webcam-display-check",
        "start-recording-with-image",
        "stop-recording-with-image",
        "study-outro",
        "feedback",
        "study-debrief"
    ];

    // insert fam & test trials at the correct position
    const all_trial_pos = frame_sequence.indexOf('start-recording-with-image');
    frame_sequence.splice(all_trial_pos + 1, 0, ...all_trials);

    // flatten list
    frame_sequence = [].concat(...frame_sequence);

    console.log(frame_sequence);

    return {
        frames: frames,
        sequence: frame_sequence
    };
}