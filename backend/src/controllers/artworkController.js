import bcrypt from 'bcrypt';
import { prisma } from "../db.js";
import jwt from 'jsonwebtoken';
import { response } from 'express';

export async function getArtworks(req, res) {
  try {
    const artworks = await prisma.artworks.findMany();

    res.json(artworks);

  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar obras"
    });
  }
}

export async function getArtworkById(req, res) {
  try {
    const artwork = await prisma.artworks.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });
    if (!artwork) {
      return res.status(404).json({
        error: "Obra não encontrada"
      });
    }
    res.json(artwork);

  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar obra"
    });
  }
}

export async function updateArtwork(req, res) {
  try {
    const updateArtWorks = await prisma.artworks.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        date: new Date(`${req.body.date}T12:00:00`),
      },
    });

    res.status(200).json({
      message: "Dados da obra alterados com sucesso",
      artwork: updateArtWorks,
    });

  } catch (error) {
    res.status(404).json({
      error: "Obra não encontrada",
    });
  }
}

export async function deleteArtwork(req, res) {
  try {
    const deleteArtWorks = await prisma.artworks.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.status(200).json({
      message: "Obra excluída com sucesso",
      artwork: deleteArtWorks,
    });

  } catch (error) {
    res.status(404).json({
      message: "Obra não encontrada",
    });
  }
}

export async function createArtwork(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Nenhuma imagem enviada",
      });
    }

    const newArtwork = await prisma.artworks.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        date: new Date(req.body.date),
        image_url: req.file.path,
      },
    });

    res.status(201).json(newArtwork);
  } catch (error) {
    console.error(error);;

    res.status(500).json({
      error: "Erro ao criar obra",
    });
  }
}

export const getBiographyOfArtist = async (req, res) => {
  try {
    const BiographyOfArtist = await prisma.artist.findMany()
    res.json(BiographyOfArtist)
  } catch (error) {
    res.status(404).json({
      error: "Informações não encontradas"
    })
  }
}

{/* TO GET DATAS OF HERO SLIDE*/ }

export const getDatasOfHeroSlide = async (req, res) => {
  try {
    const datasHeroSlide = await prisma.hero_slide.findMany()
    res.json(datasHeroSlide)
  } catch (error) {
    res.status(404).json({
      error: "Erro ao carregas dados"
    })
  }
}

export const getImage = async (req, res) => {
  try {
    const images = await prisma.artworks.findMany()
    res.status(200).json(images)
  } catch (error) {
    res.status(404).json({
      error: "Não foi possivel buscar as imagens"
    })
  }
}

export const login = async (req, res) => {

  try {
    const { email, password } = req.body
    const user = await prisma.unique_user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ message: 'Senha ou email incorretos' })
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Senha ou email incorretos' })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'error interno do servidor' })
  }
}

export const updateBiographyOfArtist = async (req, res) => {
  try {
    const data = {
      biography: req.body.biography,
    };

    if (req.file) {
      data.image_url = req.file.path;
    }

    const response = await prisma.artist.update({
      where: {
        id: 1,
      },
      data,
    });

    res.json(response);
  } catch (error) {
    res.status(404).json({ message: 'Não foi possível atualizar os dados' })
  }
}


