import multer from 'multer';
import path from 'path';
import fs from 'fs';
import BrandingSetting from '../models/WebsiteDetails.js';

// ======= Multer Configuration (5MB Limit) ========
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const normalizePath = (filePath) => filePath.replace(/\\/g, '/');

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ========== Add Branding Setting ==========
export const addBrandingSetting = async (req, res) => {
    try {
        const data = req.body;

        const setting = await BrandingSetting.findOne();
        if (setting) {

            if (req.files.dark) setting.logos.dark = normalizePath(req.files.dark[0].filename);
            if (req.files.light) setting.logos.light = normalizePath(req.files.light[0].filename);
            if (req.files.favicon) setting.logos.favicon = normalizePath(req.files.favicon[0].filename);

            setting.homepageLogo = data.homepageLogo || setting.homepageLogo;
            setting.schoolInfo = { ...setting.schoolInfo, ...data.schoolInfo };
            setting.marqueeText = data.marqueeText || setting.marqueeText;
            setting.socialLinks = { ...setting.socialLinks, ...data.socialLinks };

            await setting.save();

            return res.status(200).json({
                message: 'Branding settings updated successfully.',
                data: setting
            });
        }
        const logos = {};
        if (req.files.dark) logos.dark = normalizePath(req.files.dark[0].filename);
        if (req.files.light) logos.light = normalizePath(req.files.light[0].filename);
        if (req.files.favicon) logos.favicon = normalizePath(req.files.favicon[0].filename);

        data.logos = logos;

        const newSetting = new BrandingSetting(data);
        await newSetting.save();

        res.status(201).json({
            message: 'Branding settings added successfully.',
            data: newSetting
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ========== Update Branding Setting ==========
export const updateBrandingSetting = async (req, res) => {
    try {
        const data = req.body;
        const setting = await BrandingSetting.findOne();

        if (!setting) return res.status(404).json({ message: 'Branding settings not found' });

        if (req.files.dark) setting.logos.dark = normalizePath(req.files.dark[0].filename);
        if (req.files.light) setting.logos.light = normalizePath(req.files.light[0].filename);
        if (req.files.favicon) setting.logos.favicon = normalizePath(req.files.favicon[0].filename);

        setting.homepageLogo = data.homepageLogo || setting.homepageLogo;
        setting.schoolInfo = { ...setting.schoolInfo, ...data.schoolInfo };
        setting.marqueeText = data.marqueeText || setting.marqueeText;
        setting.socialLinks = { ...setting.socialLinks, ...data.socialLinks };

        await setting.save();

        res.status(200).json({
            message: 'Branding settings updated successfully.',
            data: setting
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ========== Get Branding Setting ==========
export const getBrandingSetting = async (req, res) => {
    try {
        const setting = await BrandingSetting.findOne();
        if (!setting) return res.status(404).json({ message: 'No branding settings found' });

        res.status(200).json(setting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
