import {React, useState} from 'react'
import {FormControl, Select, MenuItem, InputLabel, Box, TextField, Button, IconButton, Switch} from '@mui/material'
import {Delete} from '@mui/icons-material';

import Dropdown from './dropdown'
import OptionSelection from './optionSelection';
import { useEffect } from 'react';
export default function PromptPage(){
    const [subjectData, setSubjectData] = useState({
        subject: "",
        sleeve: "",
        material: "",
        colour: "",
        length: ""
    });
    const [detailData, setDetailData] = useState({
        render3D: [],
        render2D: [],
        detail: [],
        lighting: [],
        colours: []
    });
    const [descriptors, setDescriptors] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [subjectShow, setSubjectShow] = useState(['subject']);
    const [detailShow, setDetailShow] = useState([]);
    const [real, setReal] = useState(true);
    const subjectOptions = {
        subject: ["shirt", "t-shirt", "dress", "pants", "shorts", "hat", "shoes"],
        sleeve: ["short sleeve", "medium sleeve", "long sleeve"],
        material: ["cotton", "wool", "silk", "leather", "linen", ],
        colour: ["red", "orange", "green", "yellow", "blue", "purple"],
        length: ["short length", "medium length", "long length"]
    }

    const detailOptions = {
        render3D: ["analog photo", "polaroid", "macro photography", "overglaze", "volumetric fog", "depth of field", "silhouette", "motion lines", "motion blur", "fisheye", "ultra-wide angle"],
        render2D: ["color page", "halftone", "character design", "concept art", "symmetry", "pixiv fanbox (for anime/manga)", "trending on dribbble (for vector graphics)", "precise lineart", "tarot card"],
        detail: ["wallpaper", "poster", "sharp focus", "hyperrealism", "insanely detailed", "lush detail", "filigree", "intricate", "crystalline", "perfectionism", "max detail", "4k uhd", "spirals", "tendrils", "ornate", "HQ", "angelic", "decorations", "embellishments", "masterpiece", "hard edge", "breathtaking", "embroidery"],
        lighting: ["bloom", "god rays", "hard shadows", "studio lighting", "soft lighting", "diffused lighting", "rim lighting", "volumetric lighting", "specular lighting", "cinematic lighting", "luminescence", "translucency", "subsurface scattering", "global illumination", "indirect light", "radiant light rays", "bioluminescent details", "ektachrome", "glowing", "shimmering light", "halo", "iridescent", "backlighting", "caustics"],
        colours: ["vibrant", "muted colors", "vivid color", "post-processing", "colorgrading", "tone mapping", "lush", "low contrast", "vintage", "aesthetic", "psychedelic", "monochrome"]
    }
    
    const handleDescriptorChange = (e, i) => {
        setDescriptors(descriptors => {
            const newDescriptors = [...descriptors];
            newDescriptors[i] = e.target.value; 
            return newDescriptors;
        })
    }

    const handleAddDescriptor = () => {
        setDescriptors(descriptors => {
            const newDescriptors = [...descriptors];
            newDescriptors.push("");
            return newDescriptors;
        })
    }

    const handleDeleteDescriptor = (e, i) => {
        setDescriptors(descriptors => {
            const newDescriptors = [...descriptors];
            newDescriptors.splice(i, 1);
            return newDescriptors;
        })
    }
    
    const generatePrompt = () => {
        let prompt = "";
        for(const des in subjectData){
            if(subjectData[des] != "" && subjectShow.includes(des)){
                prompt += subjectData[des] + ", "
            }
        }
        for(const des of descriptors){
            prompt += des + ", ";
        }
        for(const detail in detailData){
            if(detailShow.includes(detail)){
                for(const item of detailData[detail]){
                    prompt += item + ", "
                }
            }
        }
        if(real){
            prompt += "ultra realistic 8K uhd"
        }
        setPrompt(prompt);
    }

    return (
        <div>
        <h1>Prompt Generator</h1>
        <h2>Choose Subject</h2>
        <OptionSelection data={subjectData} showData={subjectShow} setShowData={setSubjectShow}></OptionSelection>
        <br/>
        {
            Object.keys(subjectData).map((field, i) => {
                if(subjectShow.includes(field)){
                    return (
                        <div>
                            <Dropdown field={field} data={subjectData} setData={setSubjectData} options={subjectOptions[field]} multiple={false} key={i}></Dropdown>
                            <br/>
                        </div>
                    )
                }
            })
            
        }
        <h2>Custom Description</h2>
        {
            descriptors.map((descriptor, i) =>(
                <div>
                    <TextField value={descriptors[i]} onChange={(e) => handleDescriptorChange(e, i)} key={i} >description</TextField>
                    <IconButton aria-label="delete" IconButton onClick={(e) => handleDeleteDescriptor(e, i)}>
                        <Delete />
                    </IconButton>
                    <br/>
                    <br/>
                </div>
            ))
        }
        <Button onClick={handleAddDescriptor} variant="text">+ Add descriptor</Button>
        <h2>Choose Details</h2>
        <OptionSelection data={detailData} showData={detailShow} setShowData={setDetailShow}></OptionSelection>
        <br/>
        {
            Object.keys(detailData).map((field, i) => {
                if(detailShow.includes(field)){
                    return (
                        <div>
                            <Dropdown field={field} data={detailData} setData={setDetailData} options={detailOptions[field]} multiple={true} key={i}></Dropdown>
                            <br/>
                        </div>
                    )
                }
            })
        }
        <h3>Realistic</h3>
        <Switch onChange={e => setReal(e.target.checked)} checked={real}/>
        <br/>

        <Button onClick={generatePrompt} variant="contained">Generate</Button>
        
        <h2>Generated Prompt</h2>
        <TextField
          id="standard-multiline-flexible"
          label="Prompt"
          multiline
          value={prompt}
          inputProps={{
            readOnly: true
          }}
          fullWidth
        />

        
        </div>
      );
}