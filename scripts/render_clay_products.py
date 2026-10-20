import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1000, 750

def create_studio_background():
    bg = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    draw = ImageDraw.Draw(bg)
    # Warm cream vertical gradient
    for y in range(H):
        t = y / H
        r = int(255 * (1 - t) + 242 * t)
        g = int(251 * (1 - t) + 231 * t)
        b = int(245 * (1 - t) + 218 * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))
    
    # Ambient soft light spots (warm golden left, soft lavender right)
    spot = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(spot)
    sdraw.ellipse([50, -50, 550, 450], fill=(255, 235, 200, 70))
    sdraw.ellipse([600, 50, 1050, 500], fill=(230, 215, 250, 60))
    spot = spot.filter(ImageFilter.GaussianBlur(80))
    bg.alpha_composite(spot)
    return bg

def draw_blurred_shadow(target, bbox, color=(80, 50, 40, 75), radius=28):
    shadow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow_layer)
    sdraw.ellipse(bbox, fill=color)
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius))
    target.alpha_composite(shadow_layer)

def draw_clay_podium(target, cx, cy, rx, ry, height, top_color, side_color):
    # Podium drop shadow
    draw_blurred_shadow(target, [cx - rx - 30, cy + height - 20, cx + rx + 30, cy + height + ry + 40], color=(70, 45, 35, 90), radius=35)
    
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    
    # Side cylinder
    for step in range(height):
        y = cy + step
        t = step / height
        # Gradient on side from highlight to shade
        r = int(side_color[0] * (1 - 0.15 * t))
        g = int(side_color[1] * (1 - 0.15 * t))
        b = int(side_color[2] * (1 - 0.15 * t))
        draw.ellipse([cx - rx, y - ry, cx + rx, y + ry], fill=(r, g, b, 255))
        
    # Top surface with radial gradient
    top_surf = Image.new("RGBA", (rx * 2 + 4, ry * 2 + 4), (0, 0, 0, 0))
    tdraw = ImageDraw.Draw(top_surf)
    for r_step in range(rx, 0, -2):
        frac = r_step / rx
        cur_rx = r_step
        cur_ry = int(ry * frac)
        # top light from top-left
        lr = min(255, int(top_color[0] + (1 - frac) * 20))
        lg = min(255, int(top_color[1] + (1 - frac) * 18))
        lb = min(255, int(top_color[2] + (1 - frac) * 15))
        tdraw.ellipse([rx - cur_rx + 2, ry - cur_ry + 2, rx + cur_rx + 2, ry + cur_ry + 2], fill=(lr, lg, lb, 255))
    
    layer.alpha_composite(top_surf, (cx - rx - 2, cy - ry - 2))
    
    # Bevel highlight rim
    draw.arc([cx - rx, cy - ry, cx + rx, cy + ry], start=160, end=320, fill=(255, 255, 255, 120), width=3)
    target.alpha_composite(layer)

def draw_3d_text(target, text, xy, font_size, front_color, side_color, shadow_color, depth=14):
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", font_size)
    except:
        font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", font_size)
        
    x, y = xy
    # Cast shadow
    s_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(s_layer)
    s_draw.text((x + 8, y + depth + 14), text, font=font, fill=(50, 30, 25, 100))
    s_layer = s_layer.filter(ImageFilter.GaussianBlur(10))
    target.alpha_composite(s_layer)
    
    # 3D Extrusion
    e_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    e_draw = ImageDraw.Draw(e_layer)
    for d in range(depth, 0, -1):
        t = d / depth
        r = int(side_color[0] * (0.8 + 0.2 * (1 - t)))
        g = int(side_color[1] * (0.8 + 0.2 * (1 - t)))
        b = int(side_color[2] * (0.8 + 0.2 * (1 - t)))
        e_draw.text((x + int(d * 0.4), y + d), text, font=font, fill=(r, g, b, 255))
    
    # Front face
    e_draw.text((x, y), text, font=font, fill=(*front_color, 255))
    
    # Specular bevel on front top edge
    spec_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    spec_draw = ImageDraw.Draw(spec_layer)
    spec_draw.text((x, y - 1), text, font=font, fill=(255, 255, 255, 140))
    spec_layer = spec_layer.filter(ImageFilter.GaussianBlur(1))
    
    # Combine
    target.alpha_composite(e_layer)
    target.alpha_composite(spec_layer)

def render_unicorn_test():
    img = create_studio_background()
    # Studio Podium
    draw_clay_podium(img, cx=500, cy=540, rx=380, ry=95, height=35, top_color=(255, 245, 238), side_color=(238, 222, 212))
    
    # Soft Cloud stand
    draw_blurred_shadow(img, [240, 490, 760, 540], color=(70, 45, 40, 80), radius=22)
    
    # Draw cloud Stand Base (Blush Pink Clay)
    base_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(base_layer)
    # 3D rounded cloud base
    bdraw.rounded_rectangle([250, 410, 750, 490], radius=40, fill=(255, 182, 193, 255))
    # Bevel top
    bdraw.rounded_rectangle([255, 413, 745, 460], radius=30, fill=(255, 210, 220, 255))
    # Subtle 3D-print layer line effect
    for y_line in range(415, 488, 3):
        bdraw.line([(270, y_line), (730, y_line)], fill=(255, 255, 255, 25))
    base_layer = base_layer.filter(ImageFilter.GaussianBlur(1))
    img.alpha_composite(base_layer)
    
    # 3D Text 'Ananya'
    draw_3d_text(img, "Ananya", (340, 418), font_size=58, front_color=(255, 255, 255), side_color=(220, 150, 175), shadow_color=(80, 40, 50), depth=10)
    
    img.save("public/images/products/test_unicorn_sample.webp", "WEBP", quality=95)
    print("Saved test_unicorn_sample.webp")

if __name__ == "__main__":
    render_unicorn_test()
