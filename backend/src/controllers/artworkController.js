import { prisma } from "../db.js";

export async function getArtworks(req, res) {
  try {
    const artworks = await prisma.artworks.findMany();

    res.json(artworks);

  } catch(error) {
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

  } catch(error) {
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
        date: new Date(req.body.date),
      },
    });

    res.status(200).json({
      message: "Dados da obra alterados com sucesso",
      artwork: updateArtWorks,
    });

  } catch(error) {
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

  } catch(error) {
    res.status(404).json({
      message: "Obra não encontrada",
    });
  }
}

export async function createArtwork(req, res) {
  try {
    const newArtWorks = await prisma.artworks.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        date: new Date(req.body.date),
        image_url: req.body.image_url,
      },
    });

    res.status(201).json(newArtWorks);

  } catch(error) {
    res.status(500).json({
      error: "Erro ao criar obra",
    });
  }
}

export const getBiographyOfArtist = async (req, res) => {
  try {
    const BiographyOfArtist = await prisma.artist.findMany()
    res.json(BiographyOfArtist)
  } catch(error) {
    res.status(404).json({
      error: "Informações não encontradas"
    })
  }
}

{/* TO GET DATAS OF HERO SLIDE*/}

export const getDatasOfHeroSlide = async (req, res) => {
  try {
    const datasHeroSlide = await prisma.hero_slide.findMany()
    res.json(datasHeroSlide)
  } catch(error) {
    res.status(404).json({
      error: "Erro ao carregas dados"
    })
  }
}